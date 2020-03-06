import Performance from '/static/html/components/component_modules/performance/performance.mjs'
export default (show, message, color, ...args) =>{
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
        console.log('%c' + message, 'color:' + color, ...args)
    }
}