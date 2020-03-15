import colorlog from '/static/html/components/component_modules/colorLog/colorLog.mjs'
import Json from '/static/html/components/component_modules/json/json.mjs'
export default (views,property,color,substrate,relation)=>{
    return  new Promise(async (resolve, reject) => {
        color = 'action'
        await colorlog(views,'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',color, substrate, relation )
        switch (relation.toLowerCase()) {
            case 'button':
                let json = (await Json())
                let selected = await json.select(substrate)
                let jsonTemplate = await json.transformWith(property, false, selected)
                let outRoot = await json.root(jsonTemplate)
                await colorlog(views,'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',color, outRoot, relation )
                break
            case 'player':
                break
            default:
                break
        }
        resolve({ key:true})
    })
}