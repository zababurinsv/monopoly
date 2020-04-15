let iframe = {}
iframe.staticProperty = {}

export default {
    set:(name='', object= {})=>{
        iframe.staticProperty[`${name}`] = {}
        iframe.staticProperty[`${name}`] = object
    },
    get:(name='')=>{
        return iframe.staticProperty[`${name}`]
    },
    getAll:()=>{
        return iframe.staticProperty
    }
    
}