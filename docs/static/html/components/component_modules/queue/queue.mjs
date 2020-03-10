import isEmpty from '/static/html/components/component_modules/isEmpty/isEmpty_t.mjs'
import description from '/static/html/components/component_modules/description/description.mjs'
import colorlog from '/static/html/components/component_modules/colorLog/colorLog.mjs'
let object = {}
object.staticProperty = []
object.staticProperty.task = undefined

let handler = {
    get: (obj, prop) => {
        return obj[prop];
    },
    set: (obj, prop, value) => {
        obj[prop] = value;
        switch (prop) {
            case 'length':
                if(obj.length === 1){
                    let timerId = setTimeout(async function tick() {
                        if(obj.length === 0){
                            console.log('~~~~~~~~~~~ End ~~~~~~~~~~~')
                            clearTimeout(timerId);
                        }else{
                            if(obj[0].end){
                                colorlog(obj[0].console,'end',obj[0].color, obj[0].substrate, obj[0].relation )
                            }
                            console.log('~~~~~~~~~~~ Actions ~~~~~~~~~~~',obj[0])
                            obj.shift()
                            timerId = setTimeout(tick, 10);
                        }
                    }, 0);
                }
                break
            default:
                break
        }
        return true
    }
}
export default (show, message='default', color ='default', ...args) =>{
    return  new Promise(async (resolve, reject) => {
        function out(obj) {
            resolve(obj)
        }
        function err(obj) {
            reject(obj)
        }
        try {
            if(typeof args[args.length-1] === 'string'){
                if(isEmpty(object.staticProperty.task)){
                    object.staticProperty.task = []
                    object.staticProperty.task = new Proxy(object.staticProperty.task, handler)
                }
                args.unshift(object.staticProperty)
                object = await description(show, '%c%O' + args[args.length-1],'color:' + color,'[(', args.slice(0, args.length-1),'*)',message,']')
            }else{
                console.assert(false, 'не выбранно отношение')
            }
            out(object)
        }catch (e) {
            err({
                _:'object',
                error: e
            })
        }

    })
}