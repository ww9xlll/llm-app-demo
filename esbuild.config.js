const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['./src/index.ts'],
  bundle: true,
  platform: 'node',
  outfile: 'dist/index.js',
  sourcemap: true,
  target: 'node22', // 根据您需要支持的 Node.js 版本进行调整
}).catch(() => process.exit(1));