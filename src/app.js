import Alpine from 'alpinejs'
import focus from '@alpinejs/focus'
import Fuse from 'fuse.js'
import { icons } from './icons.js'

window.Alpine = Alpine

const fuse = new Fuse(icons, { keys: ['name', 'tags'],  threshold: 0.4 })

Alpine.data('app', () => ({
  query: '',
  init() {
    this.$focus.focus(this.$refs.query)
  },
  get icons() {
    return this.query !== ''
      ? fuse.search(this.query).map((result) => result.item)
      : icons
  },
  async createImage(icon) {
    const { x, y, width, height } = await miro.board.viewport.get()
    await miro.board.createImage({ x: x + width / 2, y: y + height / 2, url: icon.url, width: 100 })
  }
}))

Alpine.plugin(focus)
Alpine.start()

miro.board.ui.on('drop', async (e) => {
  const { x, y, target } = e

  if (target instanceof HTMLImageElement) {
    await miro.board.createImage({ x, y, url: target.src, width: 100 })
  }
})
