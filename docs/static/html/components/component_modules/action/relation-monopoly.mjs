export default {
    button:[
        {
            _:'create template',
            property:{
                "{{#each items}}": {
                    _: "button",
                    item: "{{this}}",
                    actions:[
                        {
                            "{{#each actions}}": {
                                _: "actions",
                                action: "{{this}}",
                            },
                        }
                    ]
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
        // {
        //     _:'create template',
        //     property:{
        //         '{{#include}}': {
        //             '{{#each items}}': {
        //                 'type': 'label',
        //                 'text': '{{name}}'
        //             }
        //         }
        //     },
        //     substrate: {
        //         _:'button',
        //         type:'default',
        //         items: ['trade-leftp-money','trade-rightp-money'],
        //         event:['onkeydown', 'onfocus', 'onchange'],
        //         actions:['tradeMoneyOnKeyDown', 'tradeMoneyOnFocus','tradeMoneyOnChange'],
        //     },
        // },
    ],
    player:[

    ],
}

