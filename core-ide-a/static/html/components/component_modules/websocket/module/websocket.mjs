let object = {}
object['staticProperty'] = []
object['staticProperty']['socket'] = undefined
object['staticProperty']['verify'] = true
object['staticProperty']['create'] = (url) =>{
    if(object['staticProperty']['socket'] === undefined){
        object['staticProperty']['verify'] = false
        object['staticProperty']['socket'] = new WebSocket(url);
    }else{
        object['staticProperty']['verify'] = true
    }
    return object['staticProperty']['socket']
}
export default  (obj)=>{
    return new Promise((resolve, reject) => {
        object['socketProtocol'] =  'ws'
        object['class'] = class Connection {
            constructor(url) {
                if(url.indexOf('https://') === -1){
                    url = url.replace('http://',`${object['socketProtocol']}://`)
                }else{
                    url = url.replace('https://',`${object['socketProtocol']}://`)
                }
            this.socket = object['staticProperty']['create'](url);
                if( object['staticProperty']['verify'] === true){

                }else{
                    this.socket.onopen = async () => {
                        console.log('connect is open')
                        document.dispatchEvent ( new CustomEvent('websocket', {
                            detail: {
                                status:'openConnect'
                            }
                        }))
                    };
                    this.socket.onclose = async (event) => {
                        if (event.wasClean) {
                            console.log('Соединение закрыто чисто')
                            object['staticProperty']['socket'] = undefined
                        } else {
                            object['staticProperty']['socket'].close()
                            object['staticProperty']['socket'] = undefined
                            console.log('Обрыв соединения')
                        }
                    };
                    this.socket.onerror = async (error) => {
                        console.error('ощибка', error)
                    };
                    this.socket.addEventListener('message',async (event) => {
                        let object = JSON.parse(event['data'])
                            console.log('~~~~~~~ response ~~~~~~~',object['_'], object)
                        switch (object['_']) {
                            case 'ide':
                                document.cookie = `ide= ${object['id']}`;
                                break
                            case 'error':
                                break
                            default:
                                document.dispatchEvent(new CustomEvent(object['_'], {
                                    detail: {
                                        data:object
                                    }
                                }))
                            break
                        }
                    });
                }
            }
            self() {
                return object
            }
        }
        resolve(object)
    })
}