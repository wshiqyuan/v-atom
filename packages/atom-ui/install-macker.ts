import type { App, Plugin } from 'vue'

export function installMacker(components: Plugin[]) {
  return {
    install(app: App) {
      components.forEach(component => app.use(component))
    },
  }
}
