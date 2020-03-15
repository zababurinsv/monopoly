import colorlog from '/static/html/components/component_modules/colorLog/colorLog.mjs'
import SELECT from '/static/html/components/component_modules/json/module-select.mjs'
import Helper from '/static/html/components/component_modules/json/module-helper.mjs'
import TRANSFORM from '/static/html/components/component_modules/json/module-transform.mjs'
import Conditional from '/static/html/components/component_modules/json/module-conditional.mjs'
let Class = class Json {
    constructor(self) {
        this.select = this.select.bind(this)
        this.transformWith = this.transformWith.bind(this)
        this.transform = this.transform.bind(this)
        this.root = this.root.bind(this)
    }
    root(obj){
        colorlog(true, 'root', '4', obj,'root')
        let root = SELECT.root(obj)
        colorlog(true, 'end', '4', obj,'root')
        return root
    }
    transformWith(obj,serialized, selected){
        colorlog(true, 'transformWith', '2', obj,'transformWith')
       let transformWith =  SELECT.transformWith(obj,serialized, selected)
        colorlog(true, 'end', '2', obj,'transformWith')
        return transformWith
    }
    transform(obj, serialized){
        colorlog(true, 'transform', '8', obj,'transform')
        let transform = SELECT.transform(obj, serialized)
        colorlog(true, 'end', '8', obj,'transform')
        return transform
    }
    select(obj ={
        _:'select',
        this:undefined,
        filter:false,
        serialized:false
    },filter, serialized){
        colorlog(true, 'select', '1', SELECT,'select')
        let select = SELECT.select(obj,filter, serialized)
        colorlog(true, 'end', '1', SELECT,'select')
        return select
    }
    get self() {
        return object
    }
}


export default Class