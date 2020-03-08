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
            case 'stat':
                color = '#348a00'
                break
            case 'constructor':
                color = '#7703fc'
            case '0':
                color = '#ca0a74'
                break
            case '1':
                color = '#f7a428'
                break
            case '2':
                color = '#d2c302'
                break
            case '3':
                color = '#13c510'
                break
            case '4':
                color = '#71bdac'
                break
            case '5':
                color = '#3fbace'
                break
            case '6':
                color = '#7928d2'
                break
            case '7':
                color = '#921436'
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
            }else if(message === 'assert'){

                console.log(args[0])
                console.assert(false,args )

            }else{
                // let relation = JSON.stringify(performance['now'](end, args[args.length-1], message))
                // let substrate = JSON.stringify(args.slice(0, args.length-1),null,2);
                // console.log(`%c${example1}\r\n%c${example2}\r\n%c${message}`, 'color:#bada55', 'color:#ba0055', 'color:#1ada55');
                // console.log(`%c${args[args.length-1]} ${relation} [(%c ${substrate} *) %c ${message}]`, 'color:'+color, 'color:black', 'color:'+color)

                console.log('%c%O' + ' '+ args[args.length-1],'color:' + color,performance['now'](end, args[args.length-1], message),'[(', ...args.slice(0, args.length-1),'*)',message,']')
            }
        }else{
            console.log('%c' + message, 'color:' + color,'--->', ...args)
        }
    }
}