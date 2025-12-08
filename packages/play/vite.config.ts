import { defineConfig } from 'vite';
import type { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()] as PluginOption[],
  resolve: {
    alias: {
      'hsy-element': resolve(__dirname, '../core/index.ts'),
    },
  },
});
