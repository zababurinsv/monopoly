import button from '/static/html/components/component_modules/type/module/object-button.mjs'
export default (obj = {_:'default'})=>{
    return new Promise( async (resolve, reject) =>{
        let object = {}
        object.staticProperty = {}
        object.staticProperty.class = undefined
        let out = (obj) => {
            resolve(obj)
        }
        let err = (error) => {
            reject(error)
        }
        try {
         switch (obj._) {
             case 'button':

                 break
             default:
                 break
         }
        }catch (e) {
            err({
                _:'type',
                error:e
            })
        }
    })
}