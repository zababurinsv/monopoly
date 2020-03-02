import isEmpty from '/static/html/components/component_modules/isEmpty/isEmpty_t.mjs'
let SELECT = {}
SELECT['$progress'] = false
SELECT['$selected'] = false


const handler = {
    get: (obj, prop) => {
        console.log('~~~ get ~~~',prop,'--->', obj[prop])
        return obj[prop]
    },
    set: (obj, prop, value) => {
        console.log('~~~ set ~~~',prop,'--->', value)
        obj[prop] = value
        return obj
    }
}

function proxy (obj) {
    obj = new Proxy(obj, handler)
    return obj
}

let Helper = {}
Helper['is_template'] = (str)=>{
   return  new Promise(async function (resolve, reject) {
    let re = /\{\{(.+)\}\}/g;
        resolve(re.test(str))
   })
}

let object = {}
object['Helper'] = proxy(Helper)
object['SELECT'] = proxy(SELECT)
Helper['is_array'] = (item)=>{
    return  new Promise(async function (resolve, reject) {
        resolve(
            Array.isArray(item) ||
            (!!item &&
                typeof item === 'object' && typeof item.length === 'number' &&
                (item.length === 0 || (item.length > 0 && (item.length - 1) in item))
            )
        )
    })
}

// {
//     is_template: function(str) {
//         var re = /\{\{(.+)\}\}/g;
//         return re.test(str);
//     },
//     is_array: function(item) {
//         return (
//             Array.isArray(item) ||
//             (!!item &&
//                 typeof item === 'object' && typeof item.length === 'number' &&
//                 (item.length === 0 || (item.length > 0 && (item.length - 1) in item))
//             )
//         );
//     },
//     resolve: function(o, path, new_val) {
        // 1. Takes any object
        // 2. Finds subtree based on path
        // 3. Sets the value to new_val
        // 4. Returns the object;
        // if (path && path.length > 0) {
        //     var func = Function('new_val', 'with(this) {this' + path + '=new_val; return this;}').bind(o);
        //     return func(new_val);
        // } else {
        //     o = new_val;
        //     return o;
        // }
    // }
// };

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

        object['class'] = class Json {
            constructor(self) {
                this.select = this.select.bind(this)
                this.transformWith = this.transformWith.bind(this)

            }
            transformWith(obj ={
                _:'select',
                template:undefined,
                serialized:false,
                SELECT: undefined
            },serialized, selected){
                return new Promise(async function (resolve, reject) {
                    let out = (obj) => {
                        resolve(obj)
                    }
                    let err = (error) => {
                        reject(error)
                    }
                    try{
                        // console.assert(false, SELECT.$progress)
                        if(isEmpty(SELECT.$progress)){
                            SELECT.$progress = null;
                        }
                        if(isEmpty(SELECT.$parsed)){
                            SELECT.$parsed = [];
                        }
                        if(isEmpty(selected)){
                        }else{
                            SELECT = Object.assign(SELECT,selected);
                            console.warn('нужно проверить работоспособность при совпадении двух свойств', SELECT)
                        }

                        let template = {}
                        if(isEmpty(obj.template)){
                            template = obj;
                        }else{
                            template = obj.template;
                        }
                        if(!isEmpty(serialized)){
                            obj.serialized = serialized
                        }
                        try {
                            if (serialized){
                                template = JSON.parse(obj);
                            }
                        } catch (error) { }
                        SELECT.$template_root = template;
                        String.prototype.$root = SELECT.$selected_root;
                        Number.prototype.$root = SELECT.$selected_root;
                        Function.prototype.$root = SELECT.$selected_root;
                        Array.prototype.$root = SELECT.$selected_root;
                        Boolean.prototype.$root = SELECT.$selected_root;
                        let root = SELECT.$selected_root;
                        // generate new $selected_root
                        if (SELECT.$selected && SELECT.$selected.length > 0) {
                            SELECT.$selected.sort(function(a, b) {
                                // sort by path length, so that deeper level items will be replaced first
                                // TODO: may need to look into edge cases
                                return b.path.length - a.path.length;
                            }).forEach(function(selection) {
                                //SELECT.$selected.forEach(function(selection) {
                                // parse selected
                                var parsed_object = TRANSFORM.run(template, selection.object);

                                // apply the result to root
                                SELECT.$selected_root = Helper.resolve(SELECT.$selected_root, selection.path, parsed_object);

                                // update selected object with the parsed result
                                selection.object = parsed_object;
                            });
                            SELECT.$selected.sort(function(a, b) {
                                return a.index - b.index;
                            });
                        } else {
                            console.assert(false, template, SELECT.$selected_root)
                            var parsed_object = TRANSFORM.run(template, SELECT.$selected_root);
                            // apply the result to root
                            SELECT.$selected_root = Helper.resolve(SELECT.$selected_root, '', parsed_object);
                        }
                    }catch (e) {
                        err({
                            _:'error menu',
                            error: e
                        })
                    }
                })

            }
            select(obj ={
                _:'select',
                this:undefined,
                filter:false,
                serialized:false
            },filter, serialized){
                return new Promise(async function (resolve, reject) {
                    let out = (obj) => {
                        resolve(obj)
                    }
                    let err = (error) => {
                        reject(error)
                    }
                    try{
                        if(!isEmpty(filter)){
                            obj.filter = filter
                        }
                        if(!isEmpty(serialized)){
                            obj.serialized = serialized
                        }
                        // console.assert(false,obj )
                        // iterate '$selected'
                        //
                        /*
                        SELECT.$selected = [{
                          value {
                            '{{#include}}': {
                              '{{#each items}}': {
                                'type': 'label',
                                'text': '{{name}}'
                              }
                            }
                          },
                          path: '$jason.head.actions.$load'
                          ...
                        }]
                        */
                        let json = {}
                        if(isEmpty(obj.this)){
                            json = obj;
                        }else{
                            json = obj.this
                        }

                        try {
                            if (serialized) json = JSON.parse(obj);
                        } catch (error) { }

                        if (filter) {
                            SELECT.$selected = [];
                            SELECT.exec(json, '', filter);
                        } else {
                            SELECT.$selected = null;
                        }

                        if (json && (Helper.is_array(json) || typeof json === 'object')) {
                            if (!SELECT.$progress) {
                                // initialize
                                if (Helper.is_array(json)) {
                                    SELECT.$val = [];
                                    SELECT.$selected_root = [];
                                } else {
                                    SELECT.$val = {};
                                    SELECT.$selected_root = {};
                                }
                            }
                            Object.keys(json).forEach(function(key) {
                                //for (var key in json) {
                                SELECT.$val[key] = json[key];
                                SELECT.$selected_root[key] = json[key];
                            });
                        } else {
                            SELECT.$val = json;
                            SELECT.$selected_root = json;
                        }
                        SELECT.$progress = true; // set the 'in progress' flag

                        out(SELECT);

                    }catch (e) {
                        err({
                            _:'error menu',
                            error: e
                        })
                    }
                })
            }
            get self() {
                return object
            }
        }
        out(object)
    })
}
