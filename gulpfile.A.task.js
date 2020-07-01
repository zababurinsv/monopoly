import gulp from 'gulp';
import replace from './gulp/replace.js'
import minify from "gulp-minify";
import del from "del";

export default (view = true, property ={}, color ="green", substrate, relation) => {
    switch (`${substrate['output']['filename']}`) {
        case 'store.Lt.core-frontend.mjs':
            property(undefined, {
                "type":`T`,
                "index":"-",
                "webpack":"-"
            })
            break
        default:
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
                .on('end', () => {
                    del(`${substrate.output.path}/${substrate.output.filename}`, {force:true})
                })
            property(undefined, {
                "type":`task.gulp.type.${substrate.output.filename}`,
                "index":{
                    input:relation,
                    output:substrate.output.dest
                },
                "webpack":substrate
            })
            break
    }
}