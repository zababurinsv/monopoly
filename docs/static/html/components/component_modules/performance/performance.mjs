import isEmpty from '/static/html/components/component_modules/isEmpty/isEmpty_t.mjs'
import module from '/static/html/components/component_modules/performance/module-performance.mjs'
let object = {}
object.staticProperty = []
object.staticProperty.class = undefined
object.staticProperty.mark = []
export default (obj = {_:'performance'})=>{
    object['class'] = class Performance {
      constructor() {
        this.mark = this.mark.bind(this)
        this.measure = this.measure.bind(this)
        this.now = this.now.bind(this)
        this.end = this.end.bind(this)
        document.addEventListener('Performance', this.end)
      }
      mark(obj ={_:'mark'}){
        return obj
      }
      measure(obj ={_:'measure'}){
        return obj
      }
      now(end = false,mark, message = ''){
        return module.mark.set({mark:mark, end:end, message:message})
      }
      end(event){
        if(isEmpty(object.staticProperty.mark[`${event['detail']['_']}`])){
          object.staticProperty.mark[`${event['detail']['_']}`] = []
        }
        object.staticProperty.mark[`${event['detail']['_']}`].push(event['detail']['data'])
      }
      get self() {
        return object
      }
      get allMark(){
        return object.staticProperty.mark
      }
    }

    if(isEmpty(object.staticProperty.class)){ object.staticProperty.class = new object['class']()}

    return object.staticProperty.class

}
