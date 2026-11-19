const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const Module = require("node:module");
const ts = require("typescript");

function loadMediaStore() {
  // The adapter is bundled by Next/Tina in the app. Isolate unrelated UI exports
  // for this Node unit test; the full app build checks actual bundler integration.
  const filename = require.resolve("next-tinacms-cloudinary");
  const compiled = new Module(filename, module);
  compiled.require = (name) => {
    if (name === "tinacms") return {
      DEFAULT_MEDIA_UPLOAD_TYPES: "image/*",
      sanitizeFilename: (name) => name,
    };
    throw new Error(`Unexpected import: ${name}`);
  };
  compiled._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText, filename);
  return compiled.exports;
}

test("Tina 3 media store uses the client auth provider and handles denial", async () => {
  const { TinaCloudCloudinaryMediaStore } = loadMediaStore();
  const calls = [];
  let status = 200;
  const client = { clientId: "fixture-site", authProvider: {
    fetchWithToken: async (url, init) => {
      calls.push({ url, init });
      return Response.json({ items: [{ id: "fixture", type: "file", src: "https://example.invalid/image.jpg" }], offset: "next" }, { status });
    },
  } };
  const store = new TinaCloudCloudinaryMediaStore(client);
  const listing = await store.list({ directory: "photos", limit: 10 });
  assert.equal(listing.items[0].id, "fixture");
  assert.equal(listing.nextOffset, "next");
  assert.match(calls[0].url, /^\/api\/cloudinary\/media\?/);
  assert.match(calls[0].url, /clientID=fixture-site/);
  status = 401;
  await assert.rejects(store.list({}), (error) => error.title === "Unauthorized");
  status = 404;
  await assert.rejects(store.list({}), (error) => error.title === "Bad Route");
});

test("Cloudinary handler refuses unauthorized and traversing requests without provider calls", async () => {
  const { createMediaHandler } = await import("next-tinacms-cloudinary/dist/handlers.js");
  const response = () => ({
    statusCode: 200, body: undefined,
    status(code) { this.statusCode = code; return this; },
    json(body) { this.body = body; return this; },
  });
  const config = { cloud_name: "fixture", api_key: "fixture", api_secret: "fixture" };
  const denied = createMediaHandler({ ...config, authorized: async () => false });
  const deniedResponse = response();
  await denied({ method: "GET", query: {} }, deniedResponse);
  assert.equal(deniedResponse.statusCode, 401);
  const allowed = createMediaHandler({ ...config, authorized: async () => true });
  const invalidResponse = response();
  await allowed({ method: "DELETE", query: { media: ["media", "../escape"] } }, invalidResponse);
  assert.equal(invalidResponse.statusCode, 400);
  assert.match(invalidResponse.body.message, /traverse/);
});
