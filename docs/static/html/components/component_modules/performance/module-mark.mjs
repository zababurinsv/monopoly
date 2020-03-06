import isEmpty from '/static/html/components/component_modules/isEmpty/isEmpty_t.mjs'
import colorlog from '/static/html/components/component_modules/colorLog/colorLog.mjs'
let mark ={}
mark.set = (obj={mark: 'performance'})=>{

    performance.mark(obj.mark)
    const performanceEntries =  performance.getEntriesByName(obj.mark)
    if(performanceEntries.length > 1){
        let time = performanceEntries[performanceEntries.length - 1].startTime - performanceEntries[performanceEntries.length - 2].startTime
        colorlog(true, `time --->`,'#fc0335', performanceEntries[0].name, '--->', time )
    }

    return performance.getEntriesByName(obj.mark)
}

mark.getAll = (obj={mark: 'performance'})=>{
    // .
    const allEntries = performance.getEntriesByType("mark");


    const performanceEntries = performance.getEntriesByName(obj.mark);
    console.log(performanceEntries.length);


    colorlog(true, 'Get all of the PerformanceMark entrie','#3e32a8', performanceEntries.length, '--->', performanceEntries )

    colorlog(true, 'Get all of the PerformanceMark entries','#3e32a8', allEntries.length, '--->', allEntries )

    return allEntries
}
export default mark