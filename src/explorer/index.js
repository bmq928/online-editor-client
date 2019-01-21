import CodeFlask from 'codeflask'
import template from './template.html'
import './style.scss'


const name = 'explorer'

controller.$inject = ['mime']
function controller(mime) {
  const self = this

  self.$onInit = function () {
    // initState()
    initCodeEditor()
    fixDefaultStyle()
  }

  self.$onChanges = function ({ code, curFile }) {
    if (code) {
      self.code = code.currentValue
    }

    if (curFile && curFile.currentValue) {
      self.curFile = curFile.currentValue
    }

    initCodeEditor()
  }

  // function initState() {
  //   // self._code = self.code || ''
  //   self._code = 'console.log("nah")'
  // }

  function initCodeEditor() {
    const fileType = mime.getFileType(self.curFile)
    const codeArea = new CodeFlask('#codeArea', {
      lineNumbers: true,
      language: fileType === mime.types.html ?  // html display is very ugly, display js instead
        mime.types.javascript :
        fileType
    })

    //change default 
    codeArea.setLineNumber = function() {
      const LINE_HEIGHT = 20
      const codeHeight = document.querySelector('.explorer code').offsetHeight
      const lineNumber = parseInt(codeHeight / LINE_HEIGHT)

      this.lineNumber = lineNumber
      this.updateLineNumbersCount()
    }

    codeArea.updateCode(self.code)
    codeArea.onUpdate(code => self.updateCode(code))
  }

  function fixDefaultStyle() {
    const preTagWidth = document.querySelector('.explorer .codeflask pre').offsetWidth

    document.querySelector('.explorer .codeflask textarea').style.width = `${preTagWidth}px`
  }
}

export default {
  name,
  options: {
    bindings: {
      updateCode: '<',
      code: '<',
      curFile: '<'
    },
    template,
    controller,
    controllerAs: 'self'
  }
}