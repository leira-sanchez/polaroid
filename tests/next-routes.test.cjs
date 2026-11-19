const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const ts = require("typescript");

function loadRoute(relativePath, imports) {
  const filename = path.resolve(__dirname, relativePath);
  const compiled = new Module(filename, module);
  compiled.paths = Module._nodeModulePaths(path.dirname(filename));
  const originalRequire = compiled.require.bind(compiled);
  compiled.require = (name) => Object.hasOwn(imports, name) ? imports[name] : originalRequire(name);
  compiled._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
  }).outputText, filename);
  return compiled.exports;
}

test("blog page and metadata await Next 15 route params", async () => {
  const queries = [];
  const post = { title: "Fixture post", summary: "Fixture summary", publishDate: "2026-11-11", body: null };
  const route = loadRoute("../app/blog/[slug]/page.tsx", {
    "@/tina/__generated__/client": { client: { queries: {
      post: async (query) => { queries.push(query); return { data: { post } }; },
    } } },
    "./BlogPostClient": () => null,
  });
  const element = await route.default({ params: Promise.resolve({ slug: "fixture" }) });
  assert.equal(element.props.post, post);
  const metadata = await route.generateMetadata({ params: Promise.resolve({ slug: "fixture" }) });
  assert.equal(metadata.title, "Fixture post");
  assert.deepEqual(queries, [{ relativePath: "fixture.md" }, { relativePath: "fixture.md" }]);
});

test("component preview awaits Next 15 route params", async () => {
  const route = loadRoute("../app/preview/[component]/page.tsx", {
    "../../../components/Preview": () => null,
  });
  const element = await route.default({ params: Promise.resolve({ component: "Skills" }) });
  assert.equal(element.props.component, "Skills");
});
