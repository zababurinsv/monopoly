import Waves from '/static/html/components/component_modules/waves/waves.mjs'
import emoji from '/static/html/components/component_modules/emoji/emoji.mjs'
import events from '/static/html/components/component_modules/CustomEvent/index.mjs'
import actions from '/static/html/components/component_modules/relation/waves.mjs'
let waves =  Waves()
let testObject = {}
testObject.staticProperty = {}
testObject.staticProperty.wallet = []
waves.then((waves)=>{
    const wvs = 10 ** 8;
    let object = {}
    object.dapp = '3N8n4Lc8BMsPPyVHJXTivQWs7ER61bB7wQn'
    object.testnodes = 'http://testnodes.wavesnodes.com'
    object.client = []
    object.client.alice = '3MvegjWphvbYgEgQmqJiJhYWXnqPNTpieVc'
    
    describe('Creating game suit', async function () {
        this.timeout(10000);
        
        before(async function () {
            console.log('emoji', emoji('all'))
            console.thinking('(((~~~))) waves (((~~~)))',emoji('thinking'), waves)
        });
    
        it('Create Account(создание аккаунта)', function () {
            return new Promise(async (resolve, reject) => {
                waves.bank(true, `${emoji('thinking')} какие то свойства`,'3', actions,'bank')
                let bank = await events.addEventListener(true, `${emoji('thinking')} какие то свойства`,'3', actions,'bank')
                resolve(bank.dAppData)
            })
        })
        
        it('Connect bank(подключение банка)', function () {
            return new Promise(async (resolve, reject) => {
                waves.bank(true, `${emoji('thinking')} какие то свойства`,'3', actions,'bank')
                let bank = await events.addEventListener(true, `${emoji('thinking')} какие то свойства`,'3', actions,'bank')
                resolve(bank.dAppData)
            })
        })
        it('Find game by ID (найти игру по ID)', function () {
            return new Promise(async (resolve, reject) => {
               let click = await events.customEvent(true,`${emoji('ecktie')}`, '4', '2gaEJYWWRdW1Xkt4oij78EuXCWtyJsis3fo5RqtiZoeM',  'search-game-id')
                resolve(click)
            })
        })
        it('Create ID(создание ID)', function () {
            return new Promise(async (resolve, reject) => {
    
                let scrollWidth = Math.max(
                    document.body.scrollWidth, document.documentElement.scrollWidth,
                    document.body.offsetWidth, document.documentElement.offsetWidth,
                    document.body.clientWidth, document.documentElement.clientWidth
                );
                document.body.insertAdjacentHTML('afterbegin',`
                <button id="testOpen"></button>
                `)
    
                document.body.addEventListener('click',async ()=>{
    
                    window.open(`http://localhost:8110/import`,`test`,`height=${scrollWidth/3},width=${scrollWidth/1.5},scrollbars=no,toolbar=no,menubar=no,status=no,resizable=no,scrollbars=no,location=no,top=${scrollWidth/2-((scrollWidth/1.5)/2)},left=${scrollWidth/2-((scrollWidth/1.8)/2)}`);
    
                })
    
                document.body.querySelector('#testOpen').click()
                // console.log('!!!!!!!!!!!!!',document.body)
                // window.addEventListener("message", async (event) => {
                    // if(event.origin === host){
                        // if(event.data.status === 'true'){
                        //     console.log(`${emoji('smile')} response`,event.origin,'--->',event.data, )
                        //     resolve(true)
                        // }else{
                        //     console.log(`${emoji('panda_face')} request`,event.data)
                            // for(let key in substrate ){
                            //     if(key !== relation){
                            //         delete substrate[key]
                            //     }
                            // }
                            // if(Object.keys(substrate).length > 1){
                            //     console.warn(`${emoji('rage')} class.mjs postMessage у объекта должно быть одно свойтсво --->`, substrate)
                            // }else if(Object.keys(substrate).length === 0){
                            //     console.warn(`${emoji('rage')} class.mjs postMessage субстран не посылается, может быть он существует на стороне обработчика --->`, substrate)
                            // }
                        // event.source.postMessage({data:'test'},event.origin)
                            // event.source.postMessage({view:view,property:property,color:color,substrate:substrate,relation:relation },event.origin)
                        // }
                    // }else{
                        // console.log(`${emoji('rage')} blockchain-waves Not Allowed`, '--->' ,event,':host === origin', host,'===', event.origin)
                    // }
                // });
    
             
                // newWin.onload = function(event) {
                //     console.log('33333333333333333333333333333333')
                //     resolve(true)
                // }
                // let gameObject = await customEvents(true,'получить параметры игры','3', {
                //     'gameName':[
                //         {
                //             '/':'waves',
                //             get:'name',
                //         },
                //         {
                //             '/':'waves',
                //             description:'it is test token for monopoly',
                //         }
                //     ]
                // },'gameName')
                //
                // listener(true, 'ждём ответа от запроса', '3', '', 'create-nft').then(async (nft)=>{
                //     await waves.waitForTx(nft.data.id,nft.apiBase)
                //     console.log(`${emoji('beer')} game.mjs`,nft.data)
                //     await customEvents(true, 'отобразить данные на странице','3',JSON.stringify(nft.data,null,4),'nft-game-params')
                // })
                // await waves.nft(true, callback,'3', {'create-nft':[
                //         {
                //         '/':'create-nft',
                //          name:gameObject.data,
                //          description:'it is test token for monopoly',
                //          dapp:'zone tower six sound oblige horn false blue enroll flash pact all',
                //          proofs:[
                //              'convince bubble claim case tube domain grief eyebrow decline witness bachelor mansion',
                //              'kitten tooth maze behave purity dance differ stereo faint immune century peace',
                //              'discover swim emerge demise dwarf inmate utility cycle hospital pistol sugar emotion'
                //          ],
                //          node:'http://testnodes.wavesnodes.com'
                //         }
                //     ]},'create-nft')
            })
        })
        it('get token(получить токены)', function () {
            return new Promise(async (resolve, reject) => {
                let nft = await waves.getNft('3N8n4Lc8BMsPPyVHJXTivQWs7ER61bB7wQn', 12)
                let object = {}
                for(let key in nft){
                    try{
                        let item = JSON.parse(nft[key].description)
                        if(item.name === 'Olga Gavrilova'){
                            object = nft[key]
                            break
                        }

                    }catch (e) {

                    }
                }
                // await customEvents(true, 'отобразить данные на странице','3',object,'objectPlayer')
                resolve(true)
            })
        })
    })
})