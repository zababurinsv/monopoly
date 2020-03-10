export default ()=>{
    return new Promise( async (resolve, reject) =>{
        let object = {}
        let out = (obj) => {
            resolve(obj)
        }
        let err = (error) => {
            reject(error)
        }
        try {
            object[''] = ()=>{
                if(isEmpty(object.staticProperty.class)){ object.staticProperty.class = new Class() }
                return object.staticProperty.class
            }
            if(isEmpty(object.staticProperty.class)){ object.staticProperty.class = new Class() }
            out(object.staticProperty.class)
        }catch (e) {
            err({
                _:'type',
                error:e
            })
        }
    })
}