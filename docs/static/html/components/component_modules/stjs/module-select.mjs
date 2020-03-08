import isEmpty from '/static/html/components/component_modules/isEmpty/isEmpty_t.mjs'
import Helper from '/static/html/components/component_modules/stjs/module-helper.mjs'
import colorlog from '/static/html/components/component_modules/colorLog/colorLog.mjs'
import TRANSFORM from '/static/html/components/component_modules/stjs/module-transform.mjs'
let SELECT ={}
let root ={}
SELECT['$progress'] = false
SELECT['$selected'] = false


SELECT.transformWith = (obj,serialized, selected) => {
    return new Promise(async (resolve, reject) => {
        let out = (obj) => {
            resolve(obj)
        }
        let err = (error) => {
            reject(error)
        }
        try{
            //colorlog('>~~~~~~~~~ SELECT.transformWith ~~~~~~~~~<','#6203fc', SELECT)
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
            }

            let template = {}
            if(isEmpty(obj.template)){
                template = obj;
            }else{
                template = obj.template;
            }
            if(isEmpty(serialized)){
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
            root = SELECT.$selected_root;
            // generate new $selected_root
            if (SELECT.$selected && SELECT.$selected.length > 0) {
                SELECT.$selected.sort(function(a, b) {
                    // sort by path length, so that deeper level items will be replaced first
                    // TODO: may need to look into edge cases
                    return b.path.length - a.path.length;
                }).forEach(function(selection) {
                    console.assert(false)
                    //SELECT.$selected.forEach(function(selection) {
                    // parse selected
                    let parsed_object = TRANSFORM.run(template, selection.object, root);

                    // apply the result to root
                    SELECT.$selected_root =  Helper.resolve(SELECT.$selected_root, selection.path, parsed_object);

                    // update selected object with the parsed result
                    selection.object = parsed_object;
                });
                SELECT.$selected.sort(function(a, b) {
                    return a.index - b.index;
                });
            } else {
                colorlog(true, 'TRANSFORM', '2', obj,'transformWith')
                let parsed_object = await TRANSFORM.run(template, SELECT.$selected_root,root);
                colorlog(true, 'out TRANSFORM in Helper.resolve', '2', obj,'transformWith')
                // apply the result to root
                SELECT.$selected_root = await Helper.resolve(SELECT.$selected_root, '', parsed_object);
            }
            delete String.prototype.$root;
            delete Number.prototype.$root;
            delete Function.prototype.$root;
            delete Array.prototype.$root;
            delete Boolean.prototype.$root;

            colorlog(true, 'end', '2', SELECT,'transformWith')
            out(SELECT);
        }catch (e) {
            err({
                _:'error menu',
                error: e
            })
        }
    })
}
SELECT.select = (obj,filter, serialized) =>{
    return new Promise(async function (resolve, reject) {
        let out = (obj) => {
            resolve(obj)
        }
        let err = (error) => {
            reject(error)
        }
        try{
            //colorlog('>~~~~~~~~~ SELECT.select ~~~~~~~~~<','#0362fc', SELECT)
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
                if (serialized){
                    json = JSON.parse(obj);
                }
            } catch (error) { }

            if (filter) {
                SELECT.$selected = [];
                await SELECT.exec(json, '', filter);
            } else {
                SELECT.$selected = null;
            }

            if (json && (await Helper.is_array(json) || typeof json === 'object')) {
                if (!SELECT.$progress) {
                    //colorlog('>~~~~~~~~~ SELECT.select ~~~~$progress~~~~~<','#0362fc')
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
                    //for (let key in json) {
                    //colorlog('>~~~~~~~~~ SELECT.select ~~~~$progress~~~~~<','#0362fc', json[key])
                    SELECT.$val[key] = json[key];
                    SELECT.$selected_root[key] = json[key];
                });
            } else {
                SELECT.$val = json;
                SELECT.$selected_root = json;
            }
            SELECT.$progress = true; // set the 'in progress' flag
            //colorlog('>~~~~~~~~~ SELECT.select ~~~~out~~~~~<','red', SELECT)
            out(SELECT);

        }catch (e) {
            err({
                _:'error menu',
                error: e
            })
        }
    })
}
SELECT.exec = (current, path, filter) => {
    return  new Promise(async function (resolve, reject) {
        let out = (obj) => {
            resolve(obj)
        }
        let err = (error) => {
            console.log('~~~ err ~~~', error)
            reject(error)
        }
        try {

            //colorlog('>~~~~~~~~~ SELECT.exec ~~~exec~~~~<','#eb3456',current,path, filter )
            // if current matches the pattern, put it in the selected array
            if (typeof current === 'string') {
                // leaf node should be ignored
                // we're lookin for keys only
            } else if (await Helper.is_array(current)) {
                for (let i=0; i<current.length; i++) {
                    //colorlog('>~~~~~~~~~ SELECT.exec ~~~exec~~~~<','#eb3456',current[i], path+'['+i+']', filter )
                    await SELECT.exec(current[i], path+'['+i+']', filter);
                }
            } else {
                // object
                for (let key in current) {
                    // '$root' is a special key that links to the root node
                    // so shouldn't be used to iterate
                    //colorlog('>~~~~~~~~~ SELECT.exec ~~~exec~~~~<','#eb3456',current, key,current[key])
                    if (key !== '$root') {
                        if (filter(key, current[key])) {
                            let index = SELECT.$selected.length;
                            SELECT.$selected.push({
                                index: index,
                                key: key,
                                path: path,
                                object: current,
                                value: current[key],
                            });
                        }
                        //colorlog('>~~~~~~~~~ SELECT.exec ~~~exec~~~~<','#eb3456',current[key], path+'["'+key+'"]', filter)
                        await SELECT.exec(current[key], path+'["'+key+'"]', filter);
                    }
                }
            }


        }catch (e) {
            err({
                _:'exec',
                error: e
            })
        }
    })
}

// Terminal methods
SELECT.objects = (obj = {_:'SELECT', SELECT:undefined}) =>{
    return  new Promise(async function (resolve, reject) {
        if(isEmpty(obj.SELECT)){
        }else{
            SELECT = obj.SELECT
        }

        SELECT.$progress = null;
        if (SELECT.$selected) {
            resolve(SELECT.$selected.map(function(item) { return item.object; }));
        } else {
            resolve([SELECT.$selected_root]);
        }


    })
}
SELECT.keys = (obj = {_:'SELECT', SELECT:undefined}) => {
    return  new Promise(async function (resolve, reject) {
        if(isEmpty(obj.SELECT)){
        }else{
            SELECT = obj.SELECT
        }


        SELECT.$progress = null;
        if (SELECT.$selected) {
            resolve(SELECT.$selected.map(function(item) { return item.key; }));
        } else {
            if (Array.isArray(SELECT.$selected_root)) {
                resolve(Object.keys(SELECT.$selected_root).map(function(key) { return parseInt(key); }));
            } else {
                resolve(Object.keys(SELECT.$selected_root));
            }
        }


    })

}
SELECT.paths = (obj = {_:'SELECT', SELECT:undefined}) => {
    return  new Promise(async function (resolve, reject) {
        if(isEmpty(obj.SELECT)){
        }else{
            SELECT = obj.SELECT
        }

        SELECT.$progress = null;
        if (SELECT.$selected) {
            resolve(SELECT.$selected.map(function(item) { return item.path; }));
        } else {
            if (Array.isArray(SELECT.$selected_root)) {
                resolve(Object.keys(SELECT.$selected_root).map(function(item) {
                    // key is integer
                    return '[' + item + ']';
                }))
            } else {
                resolve( Object.keys(SELECT.$selected_root).map(function(item) {
                    // key is string
                    return '["' + item + '"]';
                }))
            }
        }

    })
}
SELECT.values = (obj = {_:'SELECT', SELECT:undefined}) => {
    return  new Promise(async function (resolve, reject) {
        if(isEmpty(obj.SELECT)){
        }else{
            SELECT = obj.SELECT
        }
        SELECT.$progress = null;
        if (SELECT.$selected) {
            resolve(SELECT.$selected.map(function(item) { return item.value; }));
        } else {
            resolve(Object.values(SELECT.$selected_root));
        }


    })
}
SELECT.root = (obj = {_:'SELECT', SELECT:undefined}) =>{
    return  new Promise(async function (resolve, reject) {
        if(isEmpty(obj.SELECT)){
        }else{
            SELECT = obj.SELECT
        }
        SELECT.$progress = null;
        // //colorlog('>~~~~~~~~~ SELECT.root ~~~$selected_root_out~~~~<','red',SELECT.$selected_root)
        resolve(SELECT.$selected_root)
    })

}

export default SELECT