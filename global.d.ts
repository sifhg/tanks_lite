import 'p5/global'
import 'p5play'

declare global {
  interface Window {
    draw: () => void
    setup: () => void
    preload: () => void
  }
}
