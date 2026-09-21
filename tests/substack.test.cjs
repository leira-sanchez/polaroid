const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const ts = require("typescript");

const filename = path.resolve(__dirname, "../lib/substack.ts");
const compiled = new Module(filename, module);
compiled.paths = Module._nodeModulePaths(path.dirname(filename));
compiled._compile(
  ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  }).outputText,
  filename
);
const { parseSubstackFeed, fetchSubstackPosts } = compiled.exports;
const publication = "https://example.substack.com";
const feed = (...items) =>
  `<rss><channel><title>Newsletter</title>${items.join("")}</channel></rss>`;
const item = (slug, date = "", extra = "") =>
  `<item><title><![CDATA[${slug} & news]]></title><link>${publication}/p/${slug}</link><pubDate>${date}</pubDate>${extra}</item>`;

test("parses a single post, its description, and its image enclosure", () => {
  const [post] = parseSubstackFeed(feed(item("hello", "2026-09-21", `
    <description>&lt;p&gt;Tech &amp; culture&lt;/p&gt;</description>
    <enclosure url="https://substackcdn.com/photo.jpg" type="image/jpeg" />
  `)));
  assert.deepEqual(post, {
    title: "hello & news",
    url: `${publication}/p/hello`,
    summary: "Tech & culture",
    publishedAt: "2026-09-21T00:00:00.000Z",
    image: "https://substackcdn.com/photo.jpg",
  });
});

test("sorts newest first, deduplicates links, and tolerates missing dates/images", () => {
  const posts = parseSubstackFeed(feed(
    item("undated"), item("older", "2024-01-01"),
    item("newest", "2026-09-21"), item("newest", "2026-09-21"),
    item("invalid-date", "invalid")
  ));
  assert.deepEqual(posts.map((post) => post.title), [
    "newest & news", "older & news", "undated & news", "invalid-date & news"
  ]);
  assert.equal(posts[2].publishedAt, null);
  assert.equal(posts[2].image, null);
});

test("ignores audio and unsafe image URLs", () => {
  const [post] = parseSubstackFeed(feed(item("audio", "", `
    <enclosure url="https://example.com/audio.mp3" type="audio/mpeg" />
    <enclosure url="javascript:alert(1)" type="image/jpeg" />
  `)));
  assert.equal(post.image, null);
});

test("decodes Substack's HTML entities inside CDATA descriptions", () => {
  const [post] = parseSubstackFeed(feed(item("story", "", "<description><![CDATA[The governor&#8217;s story&#8212;tech &amp; culture]]></description>")));
  assert.equal(post.summary, "The governor’s story—tech & culture");
});

test("distinguishes an empty publication from malformed or unsafe feeds", () => {
  assert.deepEqual(parseSubstackFeed(feed()), []);
  for (const xml of [
    "<rss>", "<html><body>Unavailable</body></html>",
    '<!DOCTYPE rss [<!ENTITY x "test">]>' + feed(),
    feed("<item><title>No link</title></item>"),
    feed(item("unsafe").replace(`${publication}/p/unsafe`, "javascript:alert(1)")),
  ]) {
    assert.throws(() => parseSubstackFeed(xml));
  }
});

test("fetches the public RSS URL and rejects upstream failures", async (t) => {
  // Node 21 exposes fetch lazily; read it before the mock inspects its descriptor.
  void globalThis.fetch;
  const mock = t.mock.method(globalThis, "fetch", async (url, options) => {
    assert.equal(url, `${publication}/feed`);
    assert.equal(options.cache, "no-store");
    assert.ok(options.signal instanceof AbortSignal);
    return new Response(feed(item("hello")), { status: 200 });
  });
  assert.equal((await fetchSubstackPosts(publication))[0].title, "hello & news");
  mock.mock.mockImplementation(async () => new Response("Unavailable", { status: 503 }));
  await assert.rejects(fetchSubstackPosts(publication), /HTTP 503/);
  mock.mock.mockImplementation(async () => new Response("<html>Blocked</html>"));
  await assert.rejects(fetchSubstackPosts(publication), /Invalid Substack RSS/);
  mock.mock.mockImplementation(async () => { throw new Error("Network error"); });
  await assert.rejects(fetchSubstackPosts(publication), /Network error/);
});
