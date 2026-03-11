import {$} from '@core/dom'
import {Page} from '@core/Page'
import {ActiveRoute} from '@core/routes/ActiveRoute'

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is not define')
    }

    this.$placeholder = $(selector)
    this.routes = routes

      this.changePageHandler = this.changePageHandler.bind(this)

    this.init()
  }

  init() {
    window.addEventListener('hashchage', this.changePageHandler)
    this.changePageHandler()
  }

  changePageHandler() {
    const Page = this.routes.excel
    const page = new Page()
    this.$placeholder.append(page.getRoot())

    page.afterRender()
  }

  destroy() {
    window.removeEventListener('hashchage', this.changePageHandler)
  }
}
