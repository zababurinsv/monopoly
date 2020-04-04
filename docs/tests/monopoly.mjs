import Waves from '/static/html/components/component_modules/waves/waves.mjs'
import actions from '/static/html/components/component_modules/relation/waves.mjs'
import emoji from '/static/html/components/component_modules/emoji/emoji.mjs';
import Post from '/static/html/components/component_modules/postMessage/postMessage.mjs'
import substrate from '/static/html/components/component_modules/relation/waves.mjs'
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

    describe('Monopoly - Mirrors', async function () {
        this.timeout(10000);

        before(async function () {
            console.log('emoji', emoji('all'))
            console.thinking('(((~~~))) waves (((~~~)))',emoji('thinking'), waves)
        });

        it('Player Board(Выбор Игроков)', function () {
            return new Promise(function (resolve, reject) {

                reject(true)
            })
        })

        it('Game Board(создание доски)', function () {
            return new Promise(function (resolve, reject) {

                reject(true)
            })
        })

        describe('Create Network Interface(Игровой интерфейс)', async function () {
            it('connect player(подключение игрока)', function () {

                reject(true)
            })

            it('Save game data(сохранение данных игры)', function () {
                return new Promise(async (resolve, reject)=>{

                    reject(true)
                })
            })

            describe('Get game data(получить данные игры)', async function () {

                it('Get Universe(Поличить Вселенную)', function () {
                    return new Promise(async (resolve, reject)=>{
                        reject(true)
                    })
                })

                it('Get World (получить мир)', function () {
                    return new Promise(async (resolve, reject)=>{

                        reject(true)

                    })
                })

                it('Get country (получить страну)', function () {
                    return new Promise(async (resolve, reject)=>{

                        reject(true)

                    })
                })

                it('Get city (получить город)', function () {
                    return new Promise(async (resolve, reject)=>{

                        reject(true)

                    })
                })
            })
        })
    })
})