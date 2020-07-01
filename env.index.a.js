const path = require('path');
require('dotenv').config()
let object ={}
object.apps = []
for(let item of JSON.parse(process['env'][`app`])){
    let filename= `${item['T']}.${item[`La`]}.${item[`dest`]}.mjs`
    object.apps.push({
        mode: 'development',
        entry: {
            index: `${__dirname}/app.${item['T']}.${item[`La`]}.mjs`
        },
        output: {
            io: `.${process['env']['namespace']}${filename}`,    
            path: path.resolve(__dirname, 'temp'),
            dest: path.resolve(__dirname, `${item['dest']}/static/html/components/component_modules/bundle/${item['T']}`),
            filename: `${filename}`,
            chunkFilename: `${item['T']}.${item[`La`]}.mjs`,
            library: `${item['T']}.${item[`La`]}`
        },
        watch: (item.src === undefined)?[`${__dirname}/app.${item['T']}.${item[`La`]}.mjs`] : item.src.map(modules => (modules ==='/')? `${__dirname}/app.${item['T']}.${item[`La`]}.mjs`:path.resolve(__dirname, modules)),
    })
}
module.exports = object.apps