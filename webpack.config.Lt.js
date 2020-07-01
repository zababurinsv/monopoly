const path = require('path');
const apps = require('./env.index.a.js');
require('dotenv').config()
module.exports = env => {
    let object ={}
    object.apps = []
    for(let item of apps){
        switch (`${item['output']['filename']}`) {
            case 'store.Lt.core-frontend.mjs':
                console.log('webpack.build.Lt: ',{
                    mode: 'development',
                    entry: {
                        index: `${item['entry']['index']}`
                    },
                    output: {
                        path: `${item.output.path}`,
                        io: `${item.output.io}`,
                        filename: `${item['output']['filename']}`,
                        chunkFilename: `${item['output']['chunkFilename']}`,
                        library: `${item['output']['library']}`
                    },
                });
                object.apps.push({
                    mode: 'development',
                    entry: {
                        index: `${item['entry']['index']}`
                    },
                    output: {
                        path: `${item.output.path}`,
                        filename: `${item['output']['filename']}`,
                        chunkFilename: `${item['output']['chunkFilename']}`,
                        library: `${item['output']['library']}`
                    },
                })
                break
            default:
                break
        }
    }
    return object.apps
};