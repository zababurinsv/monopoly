let Conditional = {}

Conditional.is = (template) => {
    return new Promise( async (resolve, reject) => {
        let out = (obj) => {
            // console.log('~~~ out  ~~~', obj['input'])
            resolve(obj)
        }
        let err = (error) => {
            console.log('~~~ err ~~~', error)
            reject(error)
        }
        try {
            //colorlog('>~~~~~~~~~ Conditional.is ~~~~~~~~~<','#8034eb', template)
            // TRUE ONLY IF it's in a correct format.
            // Otherwise return the original template
            // Condition 0. Must be an array
            // Condition 1. Must have at least one item
            // Condition 2. Each item in the array should be an object of a single key/value pair
            // Condition 3. starts with #if
            // Condition 4. in case there's more than two items, everything between the first and the last item should be #elseif
            // Condition 5. in case there's more than two items, the last one should be either '#else' or '#elseif'
            if (!await Helper.is_array(template)) {
                // Condition 0, it needs to be an array to be a conditional
                //colorlog('>~~~~~~~~~ Conditional.is ~~~~~false~~~~<','red', template)
                out(false);
            }else{
                // Condition 1.
                // Must have at least one item
                if (template.length === 0) {
                    //colorlog('>~~~~~~~~~ Conditional.is ~~~~~false~~~~<','red', template)
                    out(false);
                }else{


                    // Condition 2.
                    // Each item in the array should be an object
                    // , and  of a single key/value pair
                    let containsValidObjects = true;
                    for (let i = 0; i < template.length; i++) {
                        let item = template[0];
                        if (typeof item !== 'object') {
                            //colorlog('>~~~~~~~~~ Conditional.is ~~~~~~~~~<','#8034eb', item)
                            containsValidObjects = false;
                            break;
                        }
                        if (Object.keys(item).length !== 1) {
                            // first item in the array has multiple key value pairs, so invalid.
                            containsValidObjects = false;
                            break;
                        }
                    }
                    if (!containsValidObjects) {
                        out(false);
                    }else{

                        // Condition 3.
                        // the first item should have #if as its key
                        // the first item should also contain an expression
                        let first = template[0];
                        let func;
                        for (let key in first) {
                            func = await TRANSFORM.tokenize(key);
                            if (!func) {
                                //colorlog('>~~~~~~~~~ Conditional.is ~~~~~false~~~~<','red', template)
                                out(false);
                            }else {
                                if (!func.name) {
                                    //colorlog('>~~~~~~~~~ Conditional.is ~~~~~false~~~~<','red', template)
                                    out(false);
                                }else {
                                    // '{{#if }}'
                                    if (!func.expression || func.expression.length === 0) {
                                        //colorlog('>~~~~~~~~~ Conditional.is ~~~~~false~~~~<','red', template)
                                        out(false);
                                    }else{
                                        if (func.name.toLowerCase() !== '#if') {
                                            //colorlog('>~~~~~~~~~ Conditional.is ~~~~~false~~~~<','red', template)
                                            out(false);
                                        }

                                    }
                                }
                            }
                        }
                        if (template.length === 1) {
                            // If we got this far and the template has only one item, it means
                            // template had one item which was '#if' so it's valid
                            //colorlog('>~~~~~~~~~ Conditional.is ~~~~~true~~~~<','red', template)
                            out(true);
                        }else{
                            //colorlog('>~~~~~~~~~ Conditional.is ~~~~~else~~~~<','red', template)
                            // Condition 4.
                            // in case there's more than two items, everything between the first and the last item should be #elseif
                            let they_are_all_elseifs = true;
                            for (let template_index = 1; template_index < template.length-1; template_index++) {
                                let template_item = template[template_index];
                                for (let template_key in template_item) {
                                    func = await TRANSFORM.tokenize(template_key);
                                    if (func.name.toLowerCase() !== '#elseif') {
                                        they_are_all_elseifs = false;
                                        break;
                                    }
                                }
                            }
                            if (!they_are_all_elseifs) {
                                // There was at least one item that wasn't an elseif
                                // therefore invalid
                                out(true);
                            }else{


                                // If you've reached this point, it means we have multiple items and everything between the first and the last item
                                // are elseifs
                                // Now we need to check the validity of the last item
                                // Condition 5.
                                // in case there's more than one item, it should end with #else or #elseif
                                let last = template[template.length-1];
                                let verify = true
                                for (let last_key in last) {
                                    func = await TRANSFORM.tokenize(last_key);
                                    //colorlog('>~~~~~~~~~ Conditional.is ~~~~~~~~~<','#8034eb', func)
                                    if (['#else', '#elseif'].indexOf(func.name.toLowerCase()) === -1) {
                                        verify = false

                                    }
                                }
                                //colorlog('>~~~~~~~~~ Conditional.is ~~~~~verify~~~~<','red', verify)
                                // Congrats, if you've reached this point, it's valid
                                out(verify);

                            }
                        }
                    }
                }
            }
        }catch (e) {
            err({
                _:'is',
                error: e
            })
        }
    })
}

export default Conditional