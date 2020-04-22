import emoji from '/static/html/components/component_modules/emoji/emoji.mjs';
let iframe = {}
iframe.staticProperty = {}
iframe.staticProperty.count = -1
window.addEventListener("message", async (event) => {
    let channel = new MessageChannel();
    let port1 = channel.port1
    let port2 = channel.port2
    if(location.origin !== event.origin){
        if(event.data === 'init'){
            console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
            event.source.postMessage({window:true},event.origin,[port2])
        }
    }
})
export default {
    set:(host='', object= {}, chanel = {}, self,alias=undefined)=>{
        
        let name = {}
        if(alias === undefined){
            name = host
        }else{
            name = alias
        }
        iframe.staticProperty[`${name}`] = {}
        iframe.staticProperty[`${name}`]['window'] = object
        iframe.staticProperty[`${name}`]['port'] = chanel
        iframe.staticProperty[`${name}`]['component'] = self
        iframe.staticProperty[`${name}`]['init'] = false
    },
    get:(name='')=>{
        return iframe.staticProperty[`${name}`]
    },
    getAll:()=>{
        return iframe.staticProperty
    },
    delete:(name='')=>{
        delete iframe.staticProperty[`${name}`]
    },
    post:(name,data = {}, callback)=>{
        if(iframe.staticProperty[`${name}`]['init']){
            data.property = location.origin
            iframe.staticProperty[`${name}`]['port'].port1.onmessage = callback
            iframe.staticProperty[`${name}`]['port'].port1.postMessage(data)
        }else{
            iframe.staticProperty[`${name}`]['port'].port1.onmessage = callback
            iframe.staticProperty[`${name}`]['init'] = true
            iframe.staticProperty[`${name}`]['window'].contentWindow.postMessage(data, iframe.staticProperty[`${name}`]['window'].src, [iframe.staticProperty[`${name}`]['port'].port2])
        }
    },
    count: ()=>{
        iframe.staticProperty.count ++
    },
    resetCount: ()=>{
        iframe.staticProperty.count = -1
    },
    getCount:()=>{
        return iframe.staticProperty.count
    },
    setPort2:(name, port, callback)=>{
        if(iframe.staticProperty[`${name}`] === undefined){
            iframe.staticProperty[`${name}`] = {}
        }
        iframe.staticProperty[`${name}`]['port2'] = port
        iframe.staticProperty[`${name}`]['port2']['onmessage'] = callback
    },
    getPort2:(name)=>{
        return iframe.staticProperty[`${name}`]['port2']
    },
    open:()=>{
        return iframe.staticProperty
    }
}