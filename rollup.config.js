/* eslint-disable */

import typescript from "rollup-plugin-typescript";
import sourceMaps from "rollup-plugin-sourcemaps";
import json from '@rollup/plugin-json';
import filesize from 'rollup-plugin-filesize';
import { terser } from 'rollup-plugin-terser'
import { name } from './package.json';

export default {
  input: "./src/index.ts",
  plugins: [
    typescript({
      exclude: "node_modules/**",
      typescript: require("typescript")
    }),
    sourceMaps(),
    terser(),
    json(),
    filesize()
  ],
  output: {
    file: 'lib/index.js',
    format: 'umd',
    name,
    sourcemap: true
  }
};
