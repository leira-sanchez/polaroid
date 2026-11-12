const { test } = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");
const { ESLint } = require("eslint");

const root = path.resolve(__dirname, "..");

test("lint excludes generated output but still checks application and Tina source", async () => {
  const eslint = new ESLint({ cwd: root, cache: false });
  for (const file of [".next/server/app/page.js", "out/index.js", "build/index.js", "public/admin/assets/index.js", "tina/__generated__/client.ts"]) {
    assert.equal(await eslint.isPathIgnored(path.join(root, file)), true, file);
  }
  for (const file of ["app/page.tsx", "components/ContactForm.tsx", "tina/config.ts"]) {
    assert.equal(await eslint.isPathIgnored(path.join(root, file)), false, file);
  }
  const [result] = await eslint.lintText(
    'import { useState } from "react"; function broken() { return useState(0); } export default broken;',
    { filePath: path.join(root, "components/LintRegressionFixture.tsx") }
  );
  assert.ok(result.messages.some(({ ruleId, severity }) => ruleId === "react-hooks/rules-of-hooks" && severity === 2),
    "invalid hooks in maintained source must still fail lint");
});
