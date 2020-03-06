let SELECT ={}

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

            colorlog('>~~~~~~~~~ SELECT.exec ~~~exec~~~~<','#eb3456',current,path, filter )
            // if current matches the pattern, put it in the selected array
            if (typeof current === 'string') {
                // leaf node should be ignored
                // we're lookin for keys only
            } else if (await Helper.is_array(current)) {
                for (let i=0; i<current.length; i++) {
                    colorlog('>~~~~~~~~~ SELECT.exec ~~~exec~~~~<','#eb3456',current[i], path+'['+i+']', filter )
                    await SELECT.exec(current[i], path+'['+i+']', filter);
                }
            } else {
                // object
                for (let key in current) {
                    // '$root' is a special key that links to the root node
                    // so shouldn't be used to iterate
                    colorlog('>~~~~~~~~~ SELECT.exec ~~~exec~~~~<','#eb3456',current, key,current[key])
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
                        colorlog('>~~~~~~~~~ SELECT.exec ~~~exec~~~~<','#eb3456',current[key], path+'["'+key+'"]', filter)
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
        colorlog('>~~~~~~~~~ SELECT.root ~~~$selected_root_out~~~~<','red',SELECT.$selected_root)
        resolve(SELECT.$selected_root)
    })

}

export default SELECT