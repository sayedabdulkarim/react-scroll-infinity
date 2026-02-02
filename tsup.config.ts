import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'lib',
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  external: ['react'],
  sourcemap: true,
  minify: true,
});
