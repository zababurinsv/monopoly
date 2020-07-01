import Socket from '/static/html/components/component_modules/websocket/module/websocket.mjs'
import isEmpty from '/static/html/components/component_modules/isEmpty/isEmpty.mjs'

let Class = class WebSocket {
    constructor() {
        this.connection = this.connection.bind(this)
    }
    connection(url = undefined){
        return new Promise(async (resolve, reject) => {
            if(isEmpty(url)){
                console.warn('не указан url подключения')
            }else{
               resolve(new (await Socket()).class(url))
            }
        })
    }
    get self() {
        return websocket
    }
}


export default Class