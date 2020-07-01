import PluginError from "plugin-error";
import through from "through2";
import dotenv from "dotenv"
dotenv.config()

export default (view = true, property = undefined, color ='green',substrate = undefined, relation = undefined) => {
    return through.obj(function (file, enc, cb) {
        if (Number.isNaN(file)) {
            cb(null, file);
        } else if (file.isBuffer()) {
            try {
                let content = file.contents.toString('utf8');

            
                content = content.replace(`var ${relation} =`, 'export default')

                file.contents = new Buffer(content, 'utf8');
                cb(null, file);
                property(true, property, 'red',`var ${relation} = to export default`,relation)
                
            }
            catch (err) {
                throw new PluginError('my-transformation', err);
            }
        } else if (file.isStream()) {
            throw new PluginError('my-transformation', 'Streams are not supported!');
        }
    });
}
