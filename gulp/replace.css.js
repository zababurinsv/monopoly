import PluginError from "plugin-error";
import through from "through2";
import dotenv from "dotenv"
dotenv.config()

export default (event, context, callback) => {
    if(!context) {
        context = {};
    }
    return through.obj(function (file, enc, cb) {
        if (Number.isNaN(file)) {
            // return as is
            cb(null, file);

        } else if (file.isBuffer()) {
            try {

                let content = file.contents.toString('utf8');

                content = content.replace(/Desktop\/telegram/g, `Desktop/${process.env.SOURCE}`)

                file.contents = new Buffer(content, 'utf8');
                callback({
                    _:'css-replace'
                })
                cb(null, file);
            }
            catch (err) {
                throw new PluginError('my-transformation', err);
            }
        } else if (file.isStream()) {
            throw new PluginError('my-transformation', 'Streams are not supported!');
        }
    });
}
