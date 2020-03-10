import colorlog from '/static/html/components/component_modules/colorLog/colorLog.mjs'
import queue from '/static/html/components/component_modules/queue/queue.mjs'
let Class = class Type {
    constructor(self) {
        colorlog(true, 'constructor' ,'constructor', this, 'constructor')
        this.button = this.button.bind(this)
        this.player = this.player.bind(this)
        this.end = this.end.bind(this)
        colorlog(true, 'end' ,'constructor', this, 'constructor')
        document.addEventListener('typeScript-end', this.end)
    }
    button(console = true,property='a',color = 'black', substrat={_:'button'},relation='button'  ){
        return queue(console, property,color,substrat,relation)
    }
    player(console = true,property='a',color = 'black', substrat={_:'player'},relation='player'  ){
        return queue(console, property,color,substrat,relation)
    }
    end(event){
        queue(event['detail']['console'], '~end',event['detail']['color'],event['detail']['substrate'],event['detail']['relation']).then((data)=>{


            console.assert(false, data)

        })
       switch (event['detail']['_']) {
           case 'button':
               break
           default:
               console.warn('событие не обрабатывается --->',event['detail']['_'],'--->',event['detail'] )
               break

       }
    }
    get self() {
        return object
    }
}


export default Class