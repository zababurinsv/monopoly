import Waves from '/static/html/components/component_modules/waves/waves.mjs'
import emoji from '/static/html/components/component_modules/emoji/emoji.mjs'
import actions from '/static/html/components/component_modules/action/index.mjs'
import events from '/static/html/components/component_modules/CustomEvent/index.mjs'
import iframe from '/static/html/components/component_modules/iframe/iframe.mjs'
import substrate from '/static/html/components/component_modules/substrate/index.mjs'
let waves =  Waves()
let testObject = {}
testObject.staticProperty = {}
testObject.staticProperty.wallet = []
waves.then((waves)=>{

    describe('account manager', async function () {
        this.timeout(10000);

        before(async function () {
            // console.log('emoji', emoji('all'))
            // console.thinking('(((~~~))) waves (((~~~)))',emoji('thinking'), waves)
        });

        it('Connect bank(подключение банка)', function () {
            return new Promise(async (resolve, reject) => {
                waves.bank(true, `${emoji('thinking')} какие то свойства`,'3', substrate.waves,'bank')
                let bank = await events.addEventListener(true, `${emoji('thinking')} какие то свойства`,'3', substrate.waves,'bank')
                resolve(bank.dAppData)
            })
        })

        it('create wallet(создать кошелёк)', function () {
            return new Promise(async (resolve, reject) => {

                resolve(true)
            })
        })

        it('add wallet set pass login(добавить кошелёк добавить пароль, вход)', function () {
            return new Promise(async (resolve, reject) => {

                let wallet = await fetch('/tests/wallet/wallet.boc')
                wallet = await wallet.text()
                let file = new File([`${wallet}`], "wallet.boc", {type: "text/plain;charset=utf-8"});
                let data = await events.eventListener.set(true, 'добавляем кошелёк в форму', '7',{"test-wallet":{
                        wallet:file,
                        pass:'123',
                    }}, 'test-wallet')
                resolve(data)
            })
        })

        it('get orders(получить ордера)', function () {
            return new Promise(async (resolve, reject) => {

                let seed = 'tone leg hidden system tenant aware desk clap body robust debris puppy ecology scan runway thing second metal cousin ocean liberty banner garment rice feel'
                let publicKey = 'HrMWJVXDkjpzkMA3LnzurfmXMtRTtip4uS2236NvW6AR'

               // let oneDay = 86400000
                let timestamp = Date.now()
                let bigNum = new waves.self.BigNumber(timestamp);
                let result = bigNum.toBytes();
                let concat = waves.self.concat(publicKey, result)
                let signature = waves.self.signBytes(seed, concat , 0)
                let orders2 = await  events.eventListener.set(true, {
                    timestamp:timestamp,
                    signature:signature
                },'7',{
                    property:'получаем ордера',
                    publicKey:publicKey,
                    relation:'t'
                },'/matcher/orderbook/{publicKey}')
                resolve(orders2)
            })
        })

        it('set order(поставить ордер)', function () {
            return new Promise(async (resolve, reject) => {
                const params = {
                    amount: 10000000,
                    price:  516000,
                    amountAsset: 'WAVES',
                    priceAsset: '3KFXBGGLCjA5Z2DuW4Dq9fDDrHjJJP1ZEkaoajSzuKsC',
                    matcherPublicKey: "8QUAqtTckM5B8gvcuP7mMswat9SjKUuafJMusEoSn1Gy",
                    orderType: 'sell'
                }
                let seed = 'tone leg hidden system tenant aware desk clap body robust debris puppy ecology scan runway thing second metal cousin ocean liberty banner garment rice feel'
                let response = waves.self.order(params, seed)
                response = JSON.stringify(response)
                let order = await events.eventListener.set(true, 'ставим ордер','7',{
                    views:true,
                    color:'5',
                    property:'~~~~',
                    substrate: response,
                    relation:'t'
                },'/matcher/orderbook')
                resolve(order)
            })
        })

        it('get balance(получить баланс)', function () {
            return new Promise(async (resolve, reject) => {
             let balance =  await  events.eventListener.set(true, 'получаем баланс','7',{
                    views:true,
                    color:'5',
                    property:'~~~~',
                    substrate:'3MxxT4EmVq5L54bNGVaNm8nRTAvTnDYVS4E',
                    relation:'t'
                },'/addresses/balance/{address}')
                resolve(balance)
            })
        })

        it('cancel all orders(завершить все ордера)', function () {
            return new Promise(async (resolve, reject) => {

                let seed = 'tone leg hidden system tenant aware desk clap body robust debris puppy ecology scan runway thing second metal cousin ocean liberty banner garment rice feel'
                let publicKey = 'HrMWJVXDkjpzkMA3LnzurfmXMtRTtip4uS2236NvW6AR'

                let oneDay = 86400000
                let timestamp = Date.now() + oneDay
                let bigNum = new waves.self.BigNumber(timestamp);
                let result = bigNum.toBytes();
                let concat = waves.self.concat(publicKey, result)
                let signature = waves.self.signBytes(seed, concat , 0)

                let request = JSON.stringify({
                    sender: publicKey,
                    timestamp: timestamp,
                    signature: signature,
                    orderId: null
                })

                await events.eventListener.set(true, {
                    timestamp:timestamp,
                    signature:signature
                },'7',{
                    property:'получаем ордера',
                    publicKey:publicKey,
                    relation:'t'
                },'/matcher/orderbook/{publicKey}')

                await events.eventListener.set(true, 'удаляем ордера','7',{
                    views:true,
                    color:'5',
                    property:'~~~~',
                    substrate:request,
                    relation:'t'
                },'/matcher/orderbook/cancel')

                 oneDay = 86400000
                 timestamp = Date.now() + oneDay
                 bigNum = new waves.self.BigNumber(timestamp);
                 result = bigNum.toBytes();
                 concat = waves.self.concat(publicKey, result)
                 signature = waves.self.signBytes(seed, concat , 0)


                await events.eventListener.set(true, {
                    timestamp:timestamp,
                    signature:signature
                },'7',{
                    property:'получаем ордера',
                    publicKey:publicKey,
                    relation:'t'
                },'/matcher/orderbook/{publicKey}')

                resolve(true)
            })
        })

    })
})