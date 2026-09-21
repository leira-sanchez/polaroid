const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const ts = require("typescript");

// Run the pure TypeScript parser with Node's test runner, without a second test framework.
const filename = path.resolve(__dirname, "../lib/goodreads.ts");
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
const { parseCurrentlyReading, fetchCurrentlyReading } = compiled.exports;
const feed = (...items) =>
  `<rss><channel><title>Leira's bookshelf: currently-reading</title>${items.join(
    ""
  )}</channel></rss>`;
const item = (id, date = "", extra = "") =>
  `<item><book_id>${id}</book_id><title><![CDATA[Book & title]]></title><author_name>Sean     Ellis</author_name><user_date_added>${date}</user_date_added>${extra}</item>`;

test("selects the newest date rather than feed order or creation date", () => {
  const result = parseCurrentlyReading(
    feed(
      item(1, "2026-09-09"),
      item(2, "2026-09-12", "<user_date_created>2001-01-01</user_date_created>")
    )
  );
  assert.equal(result.book.id, "2");
  assert.equal(result.book.author, "Sean Ellis");
  assert.equal(result.book.title, "Book & title");
  assert.equal(result.book.url, "https://www.goodreads.com/book/show/2");
});

test("ties and missing dates use stable feed order; valid dates take precedence", () => {
  assert.equal(parseCurrentlyReading(feed(item(1), item(2))).book.id, "1");
  assert.equal(
    parseCurrentlyReading(feed(item(1, "2026-09-12"), item(2, "2026-09-12")))
      .book.id,
    "1"
  );
  assert.equal(
    parseCurrentlyReading(feed(item(1, "invalid"), item(2, "2026-09-12"))).book
      .id,
    "2"
  );
});

test("decodes entities and chooses the largest allowed cover", () => {
  const xml = feed(
    item(
      1,
      "",
      "<book_large_image_url>https://i.gr-assets.com/images/large.jpg</book_large_image_url><book_image_url>https://i.gr-assets.com/images/small.jpg</book_image_url>"
    )
  ).replace("<![CDATA[Book & title]]>", "Book &amp; title");
  assert.equal(parseCurrentlyReading(xml).book.title, "Book & title");
  assert.equal(
    parseCurrentlyReading(xml).book.coverUrl,
    "https://i.gr-assets.com/images/large.jpg"
  );
  assert.equal(parseCurrentlyReading(feed(item(1))).book.coverUrl, null);
  assert.equal(
    parseCurrentlyReading(
      feed(
        item(
          1,
          "",
          "<book_large_image_url>https://example.com/image.jpg</book_large_image_url>"
        )
      )
    ).book.coverUrl,
    null
  );
});

test("only a valid empty channel produces an empty result", () => {
  assert.deepEqual(parseCurrentlyReading(feed()), { book: null });
  for (const xml of [
    "<html>unavailable</html>",
    "<rss>",
    "<rss/>",
    feed("<item/>"),
    feed(item("bad")),
    "<!DOCTYPE rss><rss/>",
  ]) {
    assert.throws(() => parseCurrentlyReading(xml));
  }
});

test("upstream failures throw instead of returning cacheable empty data", async () => {
  const original = global.fetch;
  try {
    global.fetch = async () => new Response("unavailable", { status: 503 });
    await assert.rejects(fetchCurrentlyReading(), /HTTP 503/);
    global.fetch = async () => new Response("<html>challenge</html>");
    await assert.rejects(fetchCurrentlyReading(), /Invalid Goodreads/);
    global.fetch = async () => {
      throw new DOMException("Timeout", "TimeoutError");
    };
    await assert.rejects(fetchCurrentlyReading(), /Timeout/);
    global.fetch = async (_url, options) => {
      assert.equal(options.cache, "no-store");
      assert.ok(options.signal);
      return new Response(feed(item(1)));
    };
    assert.equal((await fetchCurrentlyReading()).book.id, "1");
  } finally {
    global.fetch = original;
  }
});

test("verified Goodreads feed selects Hacking Growth", () => {
  const xml = fs.readFileSync(path.join(__dirname, "fixtures/goodreads.xml"), "utf8");
  const { book } = parseCurrentlyReading(xml);
  assert.equal(book.id, "31625067");
  assert.equal(book.author, "Sean Ellis");
  assert.match(book.title, /^Hacking Growth:/);
  assert.match(book.coverUrl, /^https:\/\/i.gr-assets.com\//);
});
