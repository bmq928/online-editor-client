import template from './template.html'
import './style.scss'

const name = 'app'

controller.$inject = []
function controller() {
  const self = this

  self.projectName = 'new-open'
}

export default {
  name,
  options: {
    bindings: {},
    template,
    controller,
    controllerAs: 'self'
}
}