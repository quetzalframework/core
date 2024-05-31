// This project bundles using ESBuild
//
// For more information check the pages:
// https://esbuild.github.io
// https://github.com/evanw/esbuild
import * as esbuild from "https://deno.land/x/esbuild/mod.js";
import { bundle } from "https://deno.land/x/emit/mod.ts";

const result = await bundle("./mod.ts", {
  importMap: "../../.rexmap.json",
});
const { code } = result;
Deno.writeFileSync("index.js", new TextEncoder().encode(code));

// Run from project root directory
await esbuild.build({
  entryPoints: ["index.js"],
  outfile: "index.min.js",
  minify: true,
});