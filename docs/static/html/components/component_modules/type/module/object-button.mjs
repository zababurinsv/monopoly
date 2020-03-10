export default ()=>{
    return new Promise( async (resolve, reject) =>{
        let object = {}
        try {
            object.data ={
                _:'button',
                type:'default',
                items: ['trade-leftp-money','trade-rightp-money'],
                event:['onkeydown', 'onfocus', 'onchange'],
                actions:['tradeMoneyOnKeyDown', 'tradeMoneyOnFocus','tradeMoneyOnChange'],
            }
            object.template = {
                button: {
                    "{{#each items}}": {
                        _: "button",
                        type: "{{this}}"
                    }
                }
            }
            resolve(object)
        }catch (e) {
            reject({
                _:'type',
                error:e
            })
        }
    })
}