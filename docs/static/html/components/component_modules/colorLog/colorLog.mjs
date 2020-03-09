import Performance from '/static/html/components/component_modules/performance/performance.mjs'
import colors from '/static/html/components/component_modules/colors/colors.mjs'
let performance = Performance()
export default async (show, message='time', color ='black', ...args) =>{
    if(show === true){
        color = await colors(color)
        if(typeof args[args.length-1] === 'string'){
            let end = false
            switch (message) {
                case "end":
                    end = true
                    break
                case "stat":
                    end = true
                    break
                default:
                    break
            }
            if(message === 'end'){end = true}

            if(message === 'stat'){
               console.log('%c статистика', 'color:' + color,'--->', performance.allMark)
            }else if(message === 'assert'){

                console.log(args[0])
                console.assert(false,args )

            }else{
                console.log('%c%O' + args[args.length-1],'color:' + color,performance['now'](end, args[args.length-1], message),'[(', ...args.slice(0, args.length-1),'*)',message,']')
            }
        }else{
            console.log('%c' + message, 'color:' + color,'--->', ...args)
        }
    }
}