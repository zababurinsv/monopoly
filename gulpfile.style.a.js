import gulp from 'gulp';
import PluginError from "plugin-error";
import autoprefixer from "gulp-autoprefixer";
import replace from './gulp/replace.js'
import {exec} from "child_process";
import minify from "gulp-minify";
import del from "del";

export default (view = true, property ={}, color ="green", substrate, relation) => {
    switch (`${substrate['output']['filename']}`) {
        case 'store.Lt.backend.mjs':
            gulp.src(`${relation}`)
                .pipe(replace(true, (view=true,property,color, substrate,relation)=>{
                    
                    console.log('gulp.index.task.replace', substrate)
                    
                },'green',{}, `${substrate.output.library}`))
                .pipe(minify({
                    ext:{
                        src:'-origin.mjs',
                        min:'.mjs'
                    },
                    noSource: true
                }))
                .pipe(gulp.dest(`${substrate.output.dest}`))
            
            property(undefined, {
                "type":`task.gulp.type.${substrate.output.filename}`,
                "index":{
                    input:relation,
                    output:substrate.output.dest
                },
                "webpack":substrate
            })
            break
        default:
            property(undefined, {
                "type":`A`,
                "index":"-",
                "webpack":"-"
            })
            break
    }
}