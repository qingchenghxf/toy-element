import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import { readdirSync } from 'fs'
import { filter, map, delay } from 'lodash-es'
// import shell from'shelljs'
// import { hooksPlugin as hooks } from '@hsy-element/vite-plugins'
// import terser from '@rollup/plugin-terser'

const TRY_MOVE_STYLES_INTERVAL = 800 as const

const isProd = process.env.NODE_ENV === "production";
const isDev = process.env.NODE_ENV === "development";
const isTest = process.env.NODE_ENV === "test";

// function moveStyles() {
//   try {
//     readdirSync('./dist/es/theme')
//     shell.mv('./dist/es/theme', './dist')
//   } catch(_) {
//     delay(moveStyles, TRY_MOVE_STYLES_INTERVAL)
//   }
// }

function getDirectoriesSync(basePath: string) {
  const entries = readdirSync(basePath, { withFileTypes: true })

  return map(
    filter(entries, (entry) => entry.isDirectory()),
    (entry) => entry.name
  )
}

export default defineConfig({
  plugins: [
    vue(), 
    dts({
      outDir: 'dist/types',
      entryRoot: resolve(__dirname, '.'),
      include: [resolve(__dirname, './index.ts'), resolve(__dirname, './components.ts')],
      exclude: ['node_modules', 'dist'],
    }),
    // hooks({
    //   rmFiles: ['./dist/es', './dist/theme', './dist/types'],
    //   afte
    // 
    // rBuild: moveStyles
    // }),
    // terser({
    //   compress: {
    //     sequences: isProd,
    //     arguments: isProd,
    //     drop_console: isProd && ["log"],
    //     drop_debugger: isProd,
    //     passes: isProd ? 4 : 1,
    //     global_defs: {
    //       "@DEV": JSON.stringify(isDev),
    //       "@PROD": JSON.stringify(isProd),
    //       "@TEST": JSON.stringify(isTest),
    //     },
    //   },
    //   format: {
    //     semicolons: false,
    //     shorthand: isProd,
    //     braces: !isProd,
    //     beautify: !isProd,
    //     comments: !isProd,
    //   },
    //   mangle: {
    //     toplevel: isProd,
    //     eval: isProd,
    //     keep_classnames: isDev,
    //     keep_fnames: isDev,
    //   },
    // }),
  ],
  build: {
    outDir: 'dist/es',
    minify: false,
    cssCodeSplit: true,
    lib: {
      entry: resolve(__dirname, './index.ts'),
      name: 'ToyElement',
      fileName: "index",
      formats: ['es']
    },
    rollupOptions: {
      external: [
        'vue',
        "@fortawesome/fontawesome-svg-core",
        "@fortawesome/free-solid-svg-icons",
        "@fortawesome/vue-fontawesome",
        "@popperjs/core",
        "async-validator"
      ],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return "index.css"
          if (
            assetInfo.type === "asset" &&
            /\.(css)$/i.test(assetInfo.name as string)
          ) {
            return "theme/[name].[ext]";
          }
          return assetInfo.name as string 
        },
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return "vendor"
          }
          if (id.includes('packages/hooks')) {
            return "hooks"
          }
          if (
            id.includes('packages/utils') ||
            id.includes("plugin-vue:export-helper")          
          ) {
            return "utils"
          }
          for (const name of getDirectoriesSync("../components")) {
            if (id.includes(`packages/components/${name}`)) {
              return name
            }
          }
        }
      }
    }
  }
})