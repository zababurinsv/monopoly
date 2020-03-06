import isEmpty from '/static/html/components/component_modules/isEmpty/isEmpty_t.mjs'
import module from '/static/html/components/component_modules/performance/module-performance.mjs'
let object = {}
object.staticProperty = []
object.staticProperty.class = undefined
export default (obj = {_:'performance'})=>{
    object['class'] = class Performance {
      constructor() {
        this.mark = this.mark.bind(this)
        this.measure = this.measure.bind(this)
        this.now = this.now.bind(this)
      }
      mark(obj ={_:'mark'}){
        return obj
      }
      measure(obj ={_:'measure'}){
        return obj
      }
      now(obj = true){
        module.mark.set()
        return obj
      }
      get self() {
        return object
      }
    }

    if(isEmpty(object.staticProperty.class)){ object.staticProperty.class = new object['class']()}

    return object.staticProperty.class

}
