import Helper from '/static/html/components/component_modules/stjs/module-helper.mjs'
import colorlog from '/static/html/components/component_modules/colorLog/colorLog.mjs'
import  Conditional from '/static/html/components/component_modules/stjs/module-conditional.mjs'
let  TRANSFORM = { }
let root = { }
TRANSFORM._fillout = (options) =>{
    return  new Promise(async function (resolve, reject) {
        let out = (obj) => {
            resolve(obj)
        }
        let err = (error) => {
            console.log('~~~ err ~~~', error)
            reject(error)
        }
        try {
            colorlog(true, 'TRANSFORM._fillout', '3', options, 'TRANSFORM')
            // Given a template and fill it out with passed slot and its corresponding data
            let re = /\{\{(.*?)\}\}/g;
            let full_re = /^\{\{((?!\}\}).)*\}\}$/;
            let variable = options.variable;
            let data = options.data;
            let template = options.template;
            // 1. Evaluate the variable
            let slot = variable.replace(re, '$1');

            // data must exist. Otherwise replace with blank
            if (data) {
                let func;
                // Attach $root to each node so that we can reference it from anywhere
                let data_type = typeof data;
                if (['number', 'string', 'array', 'boolean', 'function'].indexOf(data_type)  === -1) {
                    data.$root =   root
                }
                // If the pattern ends with a return statement, but is NOT wrapped inside another function ([^}]*$), it's a function expression
                let match = /function\([ ]*\)[ ]*\{(.*)\}[ ]*$/g.exec(slot);
                if (match) {
                    func = Function('with(this) {' + match[1] + '}').bind(data);
                } else if (/\breturn [^;]+;?[ ]*$/.test(slot) && /return[^}]*$/.test(slot)) {
                    // Function expression with explicit 'return' expression
                    func = Function('with(this) {' + slot + '}').bind(data);
                } else {
                    // Function expression with explicit 'return' expression
                    // Ordinary simple expression that
                    func = Function('with(this) {return (' + slot + ')}').bind(data);
                }
                let evaluated = func();
                delete data.$root;  // remove $root now that the parsing is over
                if (evaluated) {
                    // In case of primitive types such as String, need to call valueOf() to get the actual value instead of the promoted object
                    evaluated = evaluated.valueOf();
                }
                if (typeof evaluated === 'undefined') {
                    // it tried to evaluate since the variable existed, but ended up evaluating to undefined
                    // (example: var a = [1,2,3,4]; var b = a[5];)
                    out(template);
                } else {
                    // 2. Fill out the template with the evaluated value
                    // Be forgiving and print any type, even functions, so it's easier to debug
                    if (evaluated) {
                        // IDEAL CASE : Return the replaced template
                        if (template) {
                            // if the template is a pure template with no additional static text,
                            // And if the evaluated value is an object or an array, we return the object itself instead of
                            // replacing it into template via string replace, since that will turn it into a string.
                            if (full_re.test(template)) {
                                out(evaluated);
                            } else {
                                out(template.replace(variable, evaluated));
                            }
                        } else {
                            out(evaluated);
                        }
                    } else {
                        // Treat false or null as blanks (so that #if can handle it)
                        if (template) {
                            // if the template is a pure template with no additional static text,
                            // And if the evaluated value is an object or an array, we return the object itself instead of
                            // replacing it into template via string replace, since that will turn it into a string.
                            if (full_re.test(template)) {
                                out(evaluated);
                            } else {
                                out(template.replace(variable, ''));
                            }
                        } else {
                            return '';
                        }
                    }
                }
            }else{
                // REST OF THE CASES
                // if evaluated is null or undefined,
                // it probably means one of the following:
                //  1. The current data being parsed is not for the current template
                //  2. It's an error
                //
                //  In either case we need to return the original template unparsed.
                //    1. for case1, we need to leave the template alone so that the template can be parsed
                //      by another data set
                //    2. for case2, it's better to just return the template so it's easier to debug
                out(template);
            }
        }catch (e) {
            err({
                _:'_fillout',
                error: e
            })
        }
    })
}
TRANSFORM.fillout = (data, template, raw) =>{
    return  new Promise(async function (resolve, reject) {
        let out = (obj) => {
            resolve(obj)
        }
        let err = (error) => {
            console.log('~~~ err ~~~', error)
            reject(error)
        }
        try {
            //colorlog('>~~~~~~~~~ TRANSFORM.fillout ~~~in~~~~~~<','#9beb34',data, template, raw)
            // 1. fill out if possible
            // 2. otherwise return the original
            let replaced = template;
            // Run fillout() only if it's a template. Otherwise just return the original string
            if (await Helper.is_template(template)) {
                let re = /\{\{(.*?)\}\}/g;

                // variables are all instances of {{ }} in the current expression
                // for example '{{this.item}} is {{this.user}}'s' has two variables: ['this.item', 'this.user']
                let variables = template.match(re);

                if (variables) {
                    //colorlog('>~~~~~~~~~ TRANSFORM.fillout ~~~variables~~1~~~~<','#9beb34',variables)
                    if (raw) {
                        // 'raw' is true only for when this is called from #each
                        // Because #each is expecting an array, it shouldn't be stringified.
                        // Therefore we pass template:null,
                        // which will result in returning the original result instead of trying to
                        // replace it into the template with a stringified version
                        replaced = await TRANSFORM._fillout({
                            variable: variables[0],
                            data: data,
                            template: null,
                        });
                        //colorlog('>~~~~~~~~~ TRANSFORM.fillout ~~~_fillout~~~~~~<','#9beb34',replaced)
                    } else {
                        // Fill out the template for each variable

                        for (let i = 0; i < variables.length; i++) {
                            let variable = variables[i];
                            replaced = await TRANSFORM._fillout({
                                variable: variable,
                                data: data,
                                template: replaced,
                            });
                        }
                        //colorlog('>~~~~~~~~~ TRANSFORM.fillout ~~~variables_fillout~~2~~~~<','#9beb34',replaced)
                    }
                } else {
                    console.warn('здесь был return пока не вижу зачем он')
                }
            }
            //colorlog('>~~~~~~~~~ TRANSFORM.fillout ~~~out~~~~<','red',replaced)
            out(replaced);
        }catch (e) {
            err({
                _:'error menu',
                error: e
            })
        }

    })
}
TRANSFORM.tokenize =(str) => {
    return new Promise( async (resolve, reject) =>{
        let out = (obj) => {
            resolve(obj)
        }
        let err = (error) => {
            reject(error)
        }
        try {
            // INPUT : string
            // OUTPUT : {name: FUNCTION_NAME:STRING, args: ARGUMENT:ARRAY}
            let re = /\{\{(.+)\}\}/g;
            str = str.replace(re, '$1');
            // str : '#each $jason.items'

            let tokens = str.trim().split(' ');
            // => tokens: ['#each', '$jason.items']

            let func;
            let outItem = null
            if (tokens.length > 0) {
                if (tokens[0][0] === '#') {
                    func = tokens.shift();
                    // => func: '#each' or '#if'
                    // => tokens: ['$jason.items', '&&', '$jason.items.length', '>', '0']

                    let expression = tokens.join(' ');
                    // => expression: '$jason.items && $jason.items.length > 0'

                    outItem = { name: func, expression: expression }
                }
            }
            out(outItem)
        }catch (e) {
            err({
                _:'error menu',
                error: e
            })
        }
    })
}
TRANSFORM.run = (template, data, selectRoot) => {
    return new Promise( async (resolve, reject) =>{
        let out = (obj) => {
            // console.log('~~~ out  ~~~', obj['input'])
            resolve(obj)
        }
        let err = (error) => {
            console.log('~~~ err ~~~', error)
            reject(error)
        }
        root = selectRoot
        try {
            let result;
            let fun;
            //colorlog('>~~~~~~~~~ TRANSFORM.run ~~~template~~~~~~<','#c203fc', template)
            if (typeof template === 'string') {
                // Leaf node, so call TRANSFORM.fillout()
                if (await Helper.is_template(template)) {
                    let include_string_re = /\{\{([ ]*#include)[ ]*([^ ]*)\}\}/g;
                    //colorlog('>~~~~~~~~~ TRANSFORM.run ~~~include_string_re~~~~~~<','#c203fc', include_string_re)
                    if (include_string_re.test(template)) {
                        fun = await TRANSFORM.tokenize(template);
                        if (fun.expression) {
                            // if #include has arguments, evaluate it before attaching
                            result = await TRANSFORM.fillout(data, '{{' + fun.expression + '}}', true);
                        } else {
                            // shouldn't happen =>
                            // {'wrapper': '{{#include}}'}
                            result = template;
                        }
                    } else {
                        // non-#include
                        result = await TRANSFORM.fillout(data, template);
                    }
                } else {
                    result = template;
                }
            } else if (await Helper.is_array(template)) {
                if (await Conditional.is(template)) {
                    result =await Conditional.run(template, data);
                } else {
                    result = [];
                    for (let i = 0; i < template.length; i++) {
                        let item = await TRANSFORM.run(template[i], data);
                        if (item) {
                            // only push when the result is not null
                            // null could mean #if clauses where nothing matched => In this case instead of rendering 'null', should just skip it completely
                            // Todo : Distinguish between #if arrays and ordinary arrays, and return null for ordinary arrays
                            result.push(item);
                        }
                    }
                }
            } else if (Object.prototype.toString.call(template) === '[object Object]') {
                // template is an object
                result = {};

                // ## Handling #include
                // This needs to precede everything else since it's meant to be overwritten
                // in case of collision
                let include_object_re = /\{\{([ ]*#include)[ ]*(.*)\}\}/;
                let include_keys = Object.keys(template).filter(function(key) { return include_object_re.test(key); });
                if (include_keys.length > 0) {
                    // find the first key with #include
                    fun = await TRANSFORM.tokenize(include_keys[0]);
                    if (fun.expression) {
                        // if #include has arguments, evaluate it before attaching
                        result = await TRANSFORM.fillout(template[include_keys[0]], '{{' + fun.expression + '}}', true);
                    } else {
                        // no argument, simply attach the child
                        result = template[include_keys[0]];
                    }
                }

                for (let key in template) {
                    // Checking to see if the key contains template..
                    // Currently the only case for this are '#each' and '#include'
                    if (await Helper.is_template(key)) {
                        fun = await TRANSFORM.tokenize(key);
                        if (fun) {
                            if (fun.name === '#include') {
                                // this was handled above (before the for loop) so just ignore
                            } else if (fun.name === '#let') {
                                if (await Helper.is_array(template[key]) && template[key].length == 2) {
                                    let defs = template[key][0];
                                    let real_template = template[key][1];

                                    // 1. Parse the first item to assign variables
                                    let parsed_keys = TRANSFORM.run(defs, data);

                                    // 2. modify the data
                                    for(let parsed_key in parsed_keys) {
                                        TRANSFORM.memory[parsed_key] = parsed_keys[parsed_key];
                                        data[parsed_key] = parsed_keys[parsed_key];
                                    }

                                    // 2. Pass it into TRANSFORM.run
                                    result = await TRANSFORM.run(real_template, data);
                                }
                            } else if (fun.name === '#concat') {
                                if (await Helper.is_array(template[key])) {
                                    result = [];
                                    template[key].forEach(function(concat_item) {
                                        let res = TRANSFORM.run(concat_item, data);
                                        result = result.concat(res);
                                    });

                                    if (/\{\{(.*?)\}\}/.test(JSON.stringify(result))) {
                                        // concat should only trigger if all of its children
                                        // have successfully parsed.
                                        // so check for any template expression in the end result
                                        // and if there is one, revert to the original template
                                        result = template;
                                    }
                                }
                            } else if (fun.name === '#merge') {
                                if (await Helper.is_array(template[key])) {
                                    result = {};
                                    template[key].forEach(function(merge_item) {
                                        let res = TRANSFORM.run(merge_item, data);
                                        for (let key in res) {
                                            result[key] = res[key];
                                        }
                                    });
                                    // clean up $index from the result
                                    // necessary because #merge merges multiple objects into one,
                                    // and one of them may be 'this', in which case the $index attribute
                                    // will have snuck into the final result
                                    if(typeof data === 'object') {
                                        delete result["$index"];

                                        // #let handling
                                        for (let declared_vars in TRANSFORM.memory) {
                                            delete result[declared_vars];
                                        }
                                    } else {
                                        delete String.prototype.$index;
                                        delete Number.prototype.$index;
                                        delete Function.prototype.$index;
                                        delete Array.prototype.$index;
                                        delete Boolean.prototype.$index;

                                        // #let handling
                                        for (let declared_vars in TRANSFORM.memory) {
                                            delete String.prototype[declared_vars];
                                            delete Number.prototype[declared_vars];
                                            delete Function.prototype[declared_vars];
                                            delete Array.prototype[declared_vars];
                                            delete Boolean.prototype[declared_vars];
                                        }
                                    }
                                }
                            } else if (fun.name === '#each') {
                                //colorlog('>~~~~~~~~~ TRANSFORM.run ~~~#each~~~~~~<','#c203fc', data, '{{' + fun.expression + '}}', true)
                                // newData will be filled with parsed results
                                let newData = await TRANSFORM.fillout(data, '{{' + fun.expression + '}}', true);

                                // Ideally newData should be an array since it was prefixed by #each
                                if (newData && await Helper.is_array(newData)) {
                                    result = [];
                                    for (let index = 0; index < newData.length; index++) {
                                        // temporarily set $index
                                        //colorlog('>~~~~~~~~~ TRANSFORM.run ~~~#each~~~~~~<','#c203fc',newData[index])
                                        if(typeof newData[index] === 'object') {
                                            newData[index]["$index"] = index;
                                            // #let handling
                                            for (let declared_vars in TRANSFORM.memory) {
                                                newData[index][declared_vars] = TRANSFORM.memory[declared_vars];
                                            }
                                        } else {
                                            //colorlog('>~~~~~~~~~ TRANSFORM.run ~~~#memory~~~~~~<','#c203fc',TRANSFORM.memory)
                                            String.prototype.$index = index;
                                            Number.prototype.$index = index;
                                            Function.prototype.$index = index;
                                            Array.prototype.$index = index;
                                            Boolean.prototype.$index = index;
                                            // #let handling
                                            for (let declared_vars in TRANSFORM.memory) {
                                                String.prototype[declared_vars] = TRANSFORM.memory[declared_vars];
                                                Number.prototype[declared_vars] = TRANSFORM.memory[declared_vars];
                                                Function.prototype[declared_vars] = TRANSFORM.memory[declared_vars];
                                                Array.prototype[declared_vars] = TRANSFORM.memory[declared_vars];
                                                Boolean.prototype[declared_vars] = TRANSFORM.memory[declared_vars];
                                            }
                                        }

                                        // run
                                        //colorlog('>~~~~~~~~~ TRANSFORM.run ~~~#memory~~~~~~<','#c203fc',template[key], newData[index])
                                        let loop_item = await TRANSFORM.run(template[key], newData[index]);

                                        // clean up $index
                                        if(typeof newData[index] === 'object') {
                                            delete newData[index]["$index"];
                                            // #let handling
                                            for (let declared_vars in TRANSFORM.memory) {
                                                delete newData[index][declared_vars];
                                            }
                                        } else {
                                            //colorlog('>~~~~~~~~~ TRANSFORM.run ~~~#delete~~~~~~<','#c203fc',template[key], newData[index])
                                            delete String.prototype.$index;
                                            delete Number.prototype.$index;
                                            delete Function.prototype.$index;
                                            delete Array.prototype.$index;
                                            delete Boolean.prototype.$index;
                                            // #let handling
                                            for (let declared_vars in TRANSFORM.memory) {
                                                delete String.prototype[declared_vars];
                                                delete Number.prototype[declared_vars];
                                                delete Function.prototype[declared_vars];
                                                delete Array.prototype[declared_vars];
                                                delete Boolean.prototype[declared_vars];
                                            }
                                        }

                                        if (loop_item) {
                                            // only push when the result is not null
                                            // null could mean #if clauses where nothing matched => In this case instead of rendering 'null', should just skip it completely
                                            result.push(loop_item);
                                            //colorlog('>~~~~~~~~~ TRANSFORM.run ~~~#result~~~~~~<','#c203fc',loop_item,result)
                                        }
                                    }
                                } else {
                                    // In case it's not an array, it's an exception, since it was prefixed by #each.
                                    // This probably means this #each is not for the current variable
                                    // For example {{#each items}} may not be an array, but just leave it be, so
                                    // But don't get rid of it,
                                    // Instead, just leave it as template
                                    // So some other parse run could fill it in later.
                                    //colorlog('>~~~~~~~~~ TRANSFORM.run ~~~#result = template~~~~~~<','#c203fc',template)

                                    result = template;
                                }
                            } // end of #each
                        } else { // end of if (fun)
                            // If the key is a template expression but aren't either #include or #each,
                            // it needs to be parsed
                            //colorlog('>~~~~~~~~~ TRANSFORM.run ~~~TRANSFORM.fillout~~~~~~<','#c203fc',data, key)
                            //colorlog('>~~~~~~~~~ TRANSFORM.run ~~~TRANSFORM.fillout~~~~~~<','#c203fc',data, template[key])
                            let k = await TRANSFORM.fillout(data, key);
                            let v = await TRANSFORM.fillout(data, template[key]);
                            if (k !== undefined && v !== undefined) {
                                result[k] = v;
                                //colorlog('>~~~~~~~~~ TRANSFORM.run ~~~ result[k] = v;~~~~~~<','#c203fc',result,  result[k], k, v)
                            }
                        }
                    } else {
                        // Helper.is_template(key) was false, which means the key was not a template (hardcoded string)
                        if (typeof template[key] === 'string') {
                            fun = await TRANSFORM.tokenize(template[key]);
                            if (fun && fun.name === '#?') {
                                // If the key is a template expression but aren't either #include or #each,
                                // it needs to be parsed
                                let filled = await TRANSFORM.fillout(data, '{{' + fun.expression + '}}');
                                if (filled === '{{' + fun.expression + '}}' || !filled) {
                                    // case 1.
                                    // not parsed, which means the evaluation failed.

                                    // case 2.
                                    // returns fasly value

                                    // both cases mean this key should be excluded
                                } else {
                                    // only include if the evaluation is truthy
                                    result[key] = filled;
                                }
                            } else {
                                let item = await TRANSFORM.run(template[key], data);
                                if (item !== undefined) {
                                    result[key] = item;
                                }
                            }
                        } else {
                            let item = await TRANSFORM.run(template[key], data);
                            if (item !== undefined) {
                                result[key] = item;
                            }
                        }
                    }
                }
            } else {
                //colorlog('>~~~~~~~~~ TRANSFORM.run ~~~out~~~template~~~<','red', template)
                out(template)
            }
            // //colorlog('>~~~~~~~~~ TRANSFORM.run ~~~out~~~result~~~<','red', result)
            out(result)


        }catch (e) {
            err({
                _:'error menu',
                error: e
            })
        }
    })
}


export default TRANSFORM