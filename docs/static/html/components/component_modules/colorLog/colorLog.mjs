import Performance from '/static/html/components/component_modules/performance/performance.mjs'
let performance = Performance()
export default (show, message='time', color ='success', ...args) =>{
    if(show === true){
        color = color || 'black'
        switch (color) {
            case 'success':
                color = 'Green'
                break
            case 'info':
                color = 'DodgerBlue'
                break
            case 'error':
                color = 'Red'
                break
            case 'warning':
                color = 'Orange'
                break
            case 'events':
                color = 'blue'
                break
            case 'violet':
                color = 'violet'
                break
            case 'constructor':
                color = '#7703fc'
                break

            default:
        }
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
            }else{
                console.log('%c%O' + ' '+ args[args.length-1],'color:' + color,performance['now'](end, args[args.length-1], message),'[(', ...args.slice(0, args.length-1),'*)',message,']')
            }
        }else{
            console.log('%c' + message, 'color:' + color,'--->', ...args)
        }
    }
}