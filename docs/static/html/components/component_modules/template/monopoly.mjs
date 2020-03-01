export default (obj={_:undefined,data:{}})=>{
    return new Promise(async function (resolve, reject) {
        let out = (obj) => {
            resolve(obj)
        }
        let err = (error) => {
            reject(error)
        }
        switch (obj['_']) {
            case 'button':
                (async (obj)=>{
                    resolve({
                        onkeydown: {
                            "{{#each items}}": {
                                type: "button",
                                _:undefined,
                                alias: "{{this}}"
                            }
                        }
                    })
                })(obj)
                break
            default:
                console.warn('неизвестный темплейт', obj['_'],'---->', obj)
                break
        }
    })
}