import colors from '/static/html/components/component_modules/colors/colors.mjs'
import colorlog from '/static/html/components/component_modules/colorLog/colorLog.mjs'
import action from '/static/html/components/component_modules/action/relation-button.mjs'
export default (...args)=>{
    return  new Promise(async (resolve, reject) => {
        let object = {}
        object.pointers = [ ]
        object.pointers.push('%s')
        object.pointers.push('%d')
        object.pointers.push('%i')
        object.pointers.push('%f')
        object.pointers.push('%o')
        object.pointers.push('%O')
        object.pointers.push('%c')
        object.description = {}
        object.description.property = {}
        object.description.relation = {}
        object.description.substrate = {}
        object.description.color = 'black'
        function out(obj) {
            resolve(obj)
        }
        function err(obj) {
            reject(obj)
        }
        function addQueue() {
            for(let i=0; i< action.button.length;i++){
                object.description.substrate.queue.push({
                    _:object.description.substrate._,
                    end: (i === action.button.length -1),
                    console:object.description.console,
                    property:action.button[i].property,
                    color: object.description.color,
                    substrate: action.button[i].substrate,
                    relation:object.description.relation,
                })
            }
        }
        try {
            for(let i = 0; i < args.length;i++){
                if(typeof args[0] === 'boolean'){
                    object.description.console = args[0]
                }else{
                    console.assert(false, 'параметр для отображения в консоли должен иметь тип boolean')
                }

                if(args[i+1] === ']'){

                    object.description.property = args[i]
                }
                if(args[i+2] === '[('){
                    object.description.relation = args[i]
                    object.description.relation = object.description.relation.replace('%c%O','')
                }
                if(args[i+1] === '*)'){
                    for(let j =0; j < args[i].length;j++ ){
                        if(args[i][j].hasOwnProperty('_')){
                            object.description.substrate._ = args[i][j]._
                        }
                        if(args[i][j].hasOwnProperty('task')){
                           object.description.substrate.queue = args[i][j].task
                        }
                    }
                }
                switch (typeof args[i]) {
                    case "string":
                        let temp = args[i].split(':')
                        if(temp.length > 1){
                            if(temp[0] === 'color'){
                                object.description.color = await colors(temp[1])
                            }
                        }
                        break
                    default:
                        // console.warn('тип не отслеживается', typeof args[i], args[i])
                        break
                }
            }



            switch (object.description.substrate._) {
                case 'button':
                    addQueue()
                    break
                case 'player':
                    addQueue()
                    break
                default:
                    console.warn('объект не обрабатывается --->', object.description.substrate._,'--->',object.description)
                    break
            }
            colorlog(object.description.console, object.description.property ,object.description.color, object, `${object.description.relation}`)
            out(object)
        }catch (e) {
            err({
                _:'decription',
                error: e
            })
        }
    })
}