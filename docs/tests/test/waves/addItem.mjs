const account = "3NB6ViLiZv3r5EdQ2Q8GA8GKpuwmG3zevAt"

const accountAliceAddress = "3NAofrCBLJZ7XXSwSZfdQcAcypDwZgKSwhD"
const accountBobAddress = "3MwYBj7oXEHZxNMBbSYPK8ZvhnP9Rdj58hJ"
const accountCooperAddress = "3MsahoQ1xtzWBAKqdJGdSvCZZZEDWWfDLqc"
const accountDianaAddress = "3MtQqwq9xzbt9cXqxeZDjs5VJxK9m2jThoz"

const accountSeed = "rapid cup ring cupboard smile elite random crazy found drink mass decrease"

const accountAliceSeed = "can smart holiday walk spice power learn matter metal fade chaos silly"
const accountBobSeed = "hurt divide saddle chalk piano oak cage swap copper learn raw fashion"
const accountCooperSeed = "force gospel latin wet repeat zoo trust vacant can tuna security waste"
const accountDianaSeed = "ecology effort fiction casual festival wage hole raise rich honey rotate page"

let seed = [accountAliceSeed,accountBobSeed,accountCooperSeed]

let commits = ["G8ZMEiXEGefpEdgEFN5mYr6oEEABJrtcBBLkZf6Ujmcq","Bf2yysmAoroXAzVidK1wxuVYpRGLy1nWe6cNAGXBf5Hi","ACHSFMGY7bp3aHryCLYc499XvojeGrgBp59zSvwgLnkQ"]
let reveals = ["delisted","featured","featured"]
let salts = ["random1","random2","random3"]

let datajson = {
    "title":"penny_auction",
    "coupon_price": 1000000000,
    "old_price": 1000000000,
    "new_price": 10000000000,
    "address": "universe",
    "description": "i want to make love",
    "image": "https://ucarecdn.com/18737acb-8fb2-44e0-a949-ec241a72d543/",
}

it('add item', async function(){
    let ts = invokeScript({
        dApp: account,
        call:{
            function: "addItem",
            args: [
                { type:"string", value: datajson.title },
                { type:"integer",  value: datajson.coupon_price},
                { type:"string", value: JSON.stringify(datajson) }]
        },
        payment:[{amount:datajson.coupon_price, assetId:null}]

    },accountDianaSeed)
    let tx = await broadcast(ts)
    await waitForTx(tx.id)
    console.log(JSON.stringify(tx))

})
