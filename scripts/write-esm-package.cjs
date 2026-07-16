const { mkdirSync, writeFileSync } = require("node:fs");

mkdirSync("dist/esm", { recursive: true });
writeFileSync("dist/esm/package.json", `${JSON.stringify({ type: "module" }, null, 2)}\n`);
