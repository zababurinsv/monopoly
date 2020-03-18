export default {
    button:[
        {
            _:'create template',
            property:{
                "{{#each items}}": {
                    _: "button",
                    item: "{{this}}",
                    action:{
                        "{{#concat}}":
                            [{
                            _:'tradeMoneyOnKeyDown',
                                event:  {"{{#concat}}":['onkeydown', 'onfocus', 'onchange']}
                            }, {
                            _:'tradeMoneyOnFocus',
                                event:  {"{{#concat}}":['onkeydown', 'onfocus', 'onchange']}
                            },{
                            _:'tradeMoneyOnChange',
                                event:  {"{{#concat}}":['onkeydown', 'onfocus', 'onchange']}
                        }]
                    }

                }
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
                    _: "player",
                    item: "{{this}}",
                    action:{
                        "{{#concat}}":
                            [{
                                _:'tradeMoneyOnKeyDown',
                                event:  {"{{#concat}}":['onkeydown', 'onfocus', 'onchange']}
                            }, {
                                _:'tradeMoneyOnFocus',
                                event:  {"{{#concat}}":['onkeydown', 'onfocus', 'onchange']}
                            },{
                                _:'tradeMoneyOnChange',
                                event:  {"{{#concat}}":['onkeydown', 'onfocus', 'onchange']}
                            }]
                    }

                }
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

