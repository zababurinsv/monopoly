export default {
    button:[
        {
            _:'create template',
            property:{
                "{{#each items}}": {
                    _: "button",
                    item: "{{this}}",
                    "{{ #include }}": [ {key:'value'}]
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

    ],
}

