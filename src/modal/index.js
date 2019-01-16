import template from './template.html'
import './style.scss'

const name = 'modal'

controller.$inject = []
function controller() {
  const self = this

  self.$onInit = function () {
    initState()
  }

  self.$onChanges = function ({show}) {
    if(show && show.currentValue) {
      self.show = show.currentValue
      self.modalStyle.display = show ? 'block' : 'none'
    }
  }

  self.showModal = function () {
    self.modalStyle.display = 'block'
    if(self.iconOnClick && typeof self.iconOnClick === 'function') {
      self.iconOnClick()
    }
  }

  self.close = function () {
    self.modalStyle.display = 'none'
    if(self.onClose && typeof self.onClose === 'function') {
      self.onClose()
    }
  }

  function initState() {
    self.modalStyle = {
      display: self.show ? 'block' : 'none'
    }
  }
}

export default {
  name,
  options: {
    bindings: {
      modalName: '<',
      onClose: '<',
      icon: '<',
      iconOnClick: '<'     
    },
    template,
    controller,
    controllerAs: 'self',
    transclude: true,
  }
}