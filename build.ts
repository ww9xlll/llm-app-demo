// build.ts
import esbuild from 'esbuild';

await esbuild.build({
  logLevel: 'info',
  entryPoints: ['./src/index.ts'],
  outdir: './build',
  outExtension: {
    '.js': '.mjs'
  }, // dist ext
  minify: true,
  bundle: true,
  platform: 'node',
  format: 'esm',
  banner: {
    js: 'import { createRequire as topLevelCreateRequire } from "module"; import url from "url"; const require = topLevelCreateRequire(import.meta.url); const __filename = url.fileURLToPath(import.meta.url); const __dirname = url.fileURLToPath(new URL(".", import.meta.url));',
  },
})