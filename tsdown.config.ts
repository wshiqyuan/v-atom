import type { UserConfig } from 'tsdown'
import { defineConfig } from 'tsdown'

export function createTsdownConfig(options: {
  entry: UserConfig['entry']
  external?: (string | RegExp)[]
}) {
  return defineConfig({
    entry: options.entry,
    format: ['esm'],
    platform: 'neutral',
    dts: true,
    clean: true,
    external: [
      ...(options.external || []),
    ],
  })
}
