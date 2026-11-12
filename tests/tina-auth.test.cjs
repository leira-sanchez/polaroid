const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const ts = require("typescript");

// Exercise the actual callback and installed auth package with no provider calls.
test("Tina media authorization is scoped to this site and fails closed", async (t) => {
  const auth = await import("@tinacms/auth");
  const filename = path.resolve(__dirname, "../app/api/cloudinary/[...media].ts");
  const compiled = new Module(filename, module);
  compiled.require = (name) => {
    if (name === "@tinacms/auth") return auth;
    if (name === "next-tinacms-cloudinary/dist/handlers") {
      return { mediaHandlerConfig: {}, createMediaHandler: (options) => options };
    }
    throw new Error(`Unexpected import: ${name}`);
  };
  compiled._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText, filename);
  const { authorized } = compiled.exports.default;
  const previousEnv = { nodeEnv: process.env.NODE_ENV, clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID };
  const originalFetch = global.fetch;
  t.after(() => {
    global.fetch = originalFetch;
    if (previousEnv.nodeEnv === undefined) delete process.env.NODE_ENV;
    else process.env.NODE_ENV = previousEnv.nodeEnv;
    if (previousEnv.clientId === undefined) delete process.env.NEXT_PUBLIC_TINA_CLIENT_ID;
    else process.env.NEXT_PUBLIC_TINA_CLIENT_ID = previousEnv.clientId;
  });
  t.mock.method(console, "error", () => {});
  process.env.NODE_ENV = "production";
  const request = { query: { clientID: "other-site" }, headers: { authorization: "test-token" } };
  let calls = [];
  global.fetch = async (url, options) => {
    calls.push({ url, options });
    return Response.json({ verified: true });
  };
  process.env.NEXT_PUBLIC_TINA_CLIENT_ID = "our-site";
  assert.equal(await authorized(request), true);
  assert.equal(calls[0].url, "https://identity.tinajs.io/v2/apps/our-site/currentUser");
  assert.equal(calls[0].options.headers.get("authorization"), "test-token");
  calls = [];
  delete process.env.NEXT_PUBLIC_TINA_CLIENT_ID;
  assert.equal(await authorized(request), false);
  assert.equal(calls.length, 0, "no request may nominate another site");
  process.env.NEXT_PUBLIC_TINA_CLIENT_ID = "our-site";
  assert.equal(await authorized({ ...request, headers: {} }), false);
  assert.equal(calls.length, 0);
  global.fetch = async () => Response.json({ verified: false });
  assert.equal(await authorized(request), false);
  global.fetch = async () => new Response(null, { status: 401 });
  assert.equal(await authorized(request), false);
  global.fetch = async () => { throw new Error("offline"); };
  assert.equal(await authorized(request), false);
});
