// Regenerate raster browser icons from the approved SVG without adding dependencies.
const fs = require("node:fs/promises");
const path = require("node:path");
const React = require("react");
const { ImageResponse } = require("next/og");

async function main() {
  const root = path.join(__dirname, "..");
  const svg = await fs.readFile(path.join(root, "public/leira-bolt.svg"));
  const src = `data:image/svg+xml;base64,${svg.toString("base64")}`;

  async function render(size, apple = false) {
    const markSize = apple ? Math.round(size * 0.8) : size;
    const response = new ImageResponse(
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: apple ? "#ffffff" : "transparent",
          },
        },
        React.createElement("img", { src, width: markSize, height: markSize })
      ),
      { width: size, height: size }
    );
    return Buffer.from(await response.arrayBuffer());
  }

  const sizes = [16, 32, 48, 256];
  const images = await Promise.all(sizes.map((size) => render(size)));
  const header = Buffer.alloc(6);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(sizes.length, 4);
  let offset = header.length + sizes.length * 16;
  const entries = sizes.map((size, index) => {
    const entry = Buffer.alloc(16);
    entry[0] = entry[1] = size === 256 ? 0 : size;
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(images[index].length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += images[index].length;
    return entry;
  });

  await Promise.all([
    fs.writeFile(path.join(root, "public/icon.png"), images[1]),
    fs.writeFile(path.join(root, "public/apple-icon.png"), await render(180, true)),
    fs.writeFile(path.join(root, "app/favicon.ico"), Buffer.concat([header, ...entries, ...images])),
  ]);
  console.log("Regenerated favicon.ico, icon.png, and apple-icon.png from leira-bolt.svg.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
