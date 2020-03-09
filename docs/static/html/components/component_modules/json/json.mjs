import isEmpty from '/static/html/components/component_modules/isEmpty/isEmpty_t.mjs'
import Class from '/static/html/components/component_modules/json/module-class.mjs'
let object = { }
object.staticProperty = {}
object.staticProperty.class = undefined
export default (obj = {_:'json'})=>{
    return new Promise( async (resolve, reject) =>{
        let out = (obj) => {
            // console.log('~~~ out  ~~~', obj['input'])
            resolve(obj)
        }
        let err = (error) => {
            console.log('~~~ err ~~~', error)
            reject(error)
        }
        object['class'] = ()=>{
            if(isEmpty(object.staticProperty.class)){ object.staticProperty.class = new Class() }
            return object.staticProperty.class
        }
        if(isEmpty(object.staticProperty.class)){ object.staticProperty.class = new Class() }
        out(object.staticProperty.class)
    })
}
