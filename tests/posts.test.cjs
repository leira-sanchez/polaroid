const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const ts = require("typescript");
const filename = path.resolve(__dirname, "../lib/posts.ts");
const compiled = new Module(filename, module);
compiled.paths = Module._nodeModulePaths(path.dirname(filename));
const original = compiled.require.bind(compiled);
compiled.require = name => name === "server-only" ? {} : original(name);
compiled._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true }
}).outputText, filename);
const { parsePost, getPost, getPosts } = compiled.exports;

test("frontmatter preserves Spanish, dates, tags, code and Markdown without executing HTML", () => {
  const body = '# ¡Hola!\n\n```js\nconst café = 1;\n```\n\n![Foto](/photo.jpg)\n\n<script>bad()</script>';
  const source = '---\ntitle: "¡Una historia!"\nslug: different-field\npublishDate: July 16, 2024\ntags: [tech, español]\n---\n'+body;
  const post = parsePost(source, 'filename');
  assert.equal(post.slug, 'filename'); assert.equal(post.publishDate, 'July 16, 2024');
  assert.deepEqual(post.tags, ['tech', 'español']); assert.equal(post.body, body);
  assert.equal(post.draft, false);
});
test("draft and invalid-frontmatter semantics are explicit", () => {
  assert.equal(parsePost('---\ntitle: Draft\ndraft: true\n---\nprivate', 'draft').draft, true);
  assert.throws(() => parsePost('---\ntitle: Test\ndraft: "false"\n---\n', 'bad'));
  assert.throws(() => parsePost('---\ntitle: Test\ntitle: Duplicate\n---\n', 'bad'));
  assert.throws(() => parsePost('---\ntitle: Test\ntags: nope\n---\n', 'bad'));
  assert.throws(() => parsePost('missing', 'bad'));
});
test("public lookup rejects traversal and returns null for absent posts", async () => {
  for (const slug of ['../package', '%2e%2e', 'a/b', 'a\\b', '', 'missing-post']) assert.equal(await getPost(slug), null);
});
test("all tracked legacy articles are represented with original body and filename", async () => {
  const posts = await getPosts();
  assert.deepEqual(posts.map(p => p.slug), ['working-at-startups']);
  const source = fs.readFileSync(path.resolve(__dirname, '../content/posts/working-at-startups.md'), 'utf8');
  assert.equal(posts[0].body, source.slice(source.indexOf('\n---', 4)+5));
  assert.equal(posts[0].title, '🚀 Why I love working at startups');
});

test("drafts are excluded from both lookup and listing", async () => {
  const fixture = new Module(filename, module);
  fixture.paths = compiled.paths;
  fixture.require = name => name === "server-only" ? {} : name === "node:fs/promises" ? {
    readdir: async () => ['published.md', 'draft.md'],
    readFile: async file => `---\ntitle: Fixture\ndraft: ${file.endsWith('/draft.md')}\n---\nFixture body`,
  } : original(name);
  fixture._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true }
  }).outputText, filename);
  assert.equal(await fixture.exports.getPost('draft'), null);
  assert.deepEqual((await fixture.exports.getPosts()).map(p => p.slug), ['published']);
});

test("Markdown renderer supports GFM and does not activate arbitrary HTML", async () => {
  const React = require('react');
  const { renderToStaticMarkup } = require('react-dom/server');
  const { default: Markdown } = await import('react-markdown');
  const { default: remarkGfm } = await import('remark-gfm');
  const html = renderToStaticMarkup(React.createElement(Markdown, { remarkPlugins: [remarkGfm] },
    '| Tool | Result |\n| --- | --- |\n| café | bien |\n\n```js\nconst x = 1;\n```\n\n![Photo](/photo.jpg)\n\n<script>alert(1)</script>\n\n[bad](javascript:alert(1))'));
  assert.ok(html.includes('<table>') && html.includes('language-js') && html.includes('/photo.jpg'));
  assert.ok(!html.includes('<script>') && !html.includes('href="javascript:'));
});
