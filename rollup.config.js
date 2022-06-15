import createRollupConfig from '@guanghechen/rollup-config'
import copy from '@guanghechen/rollup-plugin-copy'
import replace from '@rollup/plugin-replace'
import manifest from './package.json'

process.env.ROLLUP_SHOULD_SOURCEMAP = false

const configs = [
  {
    ...createRollupConfig({
      manifest,
      pluginOptions: {
        commonjsOptions: {
          sourceMap: true,
        },
        typescriptOptions: {
          tsconfig: 'tsconfig.json',
        },
      },
      additionalPlugins: [
        replace({
          preventAssignment: true,
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
        copy({
          targets: [
            { src: 'types/**/*', dest: 'lib/types' }
          ]
        })
      ].filter(x => Boolean(x)),
    }),
    external: () => false,
  },
]

export default configs
