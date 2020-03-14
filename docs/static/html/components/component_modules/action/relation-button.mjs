export default {
    button:[
        {
            _:'create template',
            property:{
                "{{#each items}}": {
                    _: "button",
                    type: "{{this}}"
                },
            },
            substrate: {
                _:'button',
                type:'default',
                items: ['trade-leftp-money','trade-rightp-money'],
                event:['onkeydown', 'onfocus', 'onchange'],
                actions:['tradeMoneyOnKeyDown', 'tradeMoneyOnFocus','tradeMoneyOnChange'],
            },
        },
    ],
    player:[
        {
            _:'create template',
            property:{
                "{{#each items}}": {
                    _: "button",
                    type: "{{this}}"
                },
            },
            substrate: {
                _:'button',
                type:'default',
                items: ['trade-leftp-money','trade-rightp-money'],
                event:['onkeydown', 'onfocus', 'onchange'],
                actions:['tradeMoneyOnKeyDown', 'tradeMoneyOnFocus','tradeMoneyOnChange'],
            },
        },
    ],
}

