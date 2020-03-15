export default (color)=>{
    return new Promise((resolve, reject) => {
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
            case 'action':
                color = '#49483dfc'
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
        resolve(color)
    })
}



