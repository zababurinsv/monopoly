import colorlog from '/static/html/components/component_modules/colorLog/colorLog.mjs'
import queue from '/static/html/components/component_modules/queue/queue.mjs'
let Class = class Type {
    constructor(self) {
        colorlog(true, 'constructor' ,'constructor', this, 'constructor')
        this.button = this.button.bind(this)
        colorlog(true, 'end' ,'constructor', this, 'constructor')
    }
    button(console = true,property='a',color = 'black', substrat={_:'button'},relation='button'  ){
        return queue(console, property,color,substrat,relation)
    }
    get self() {
        return object
    }
}


export default Class