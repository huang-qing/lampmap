/* global $ LampMap */
$(function () {
    var options,
        lampmap,
        data,
        data2;

    options = {
        container: $('#lampmap')[0]
    };
    lampmap = new LampMap(options);

    data = [
        {
            id: '1',
            text: '1',
            state: 'normal',
            children: [{
                id: '6',
                text: '6',
                state: 'normal',
                //expand: false,
                children: [
                    {
                        id: '7',
                        text: '7',
                        state: 'normal'
                    },
                    {
                        id: '8',
                        text: '8',
                        state: 'alter',
                        children: [
                            {
                                id: '31',
                                text: '31',
                                state: 'normal'
                            },
                            {
                                id: '32',
                                text: '32',
                                state: 'alter'
                            },
                            {
                                id: '33',
                                text: '33',
                                state: 'alter'
                            }
                        ]
                    },
                    {
                        id: '9',
                        text: '9',
                        state: 'alter',
                        prepose: '8'
                    },
                    {
                        id: '10',
                        text: '10',
                        state: 'alter',
                        prepose: '9'
                    },
                    {
                        id: '11',
                        text: '11',
                        state: 'alter'
                    }
                ]
            },
            {
                id: '2',
                text: '2',
                state: 'delay',
            },
            {
                id: '3',
                text: '3',
                state: 'delayFinished',
                children: [
                    {
                        id: '20',
                        text: '20',
                        state: 'normal',
                        children: [
                            {
                                id: '41',
                                text: '41',
                                state: 'normal'
                            },
                            {
                                id: '42',
                                text: '42',
                                state: 'alter',
                                prepose: '41'
                            },
                            {
                                id: '43',
                                text: '43',
                                state: 'alter',
                                prepose: '42'
                            }
                        ]
                    },
                    {
                        id: '21',
                        text: '21',
                        state: 'alter',
                        children: [
                            {
                                id: '23',
                                text: '23',
                                state: 'normal'
                            },
                            {
                                id: '24',
                                text: '24',
                                state: 'alter',
                                prepose: '23'
                            },
                            {
                                id: '25',
                                text: '25',
                                state: 'alter',
                                prepose: '24'
                            }
                        ]
                    },
                    {
                        id: '22',
                        text: '22',
                        state: 'alter'
                    }
                ]

            },
            {
                id: '4',
                text: '4',
                state: 'normalFinished'
            },
            {
                id: '5',
                text: '5',
                state: 'normal',
                children: [
                    {
                        id: '12',
                        text: '12',
                        state: 'normal'
                    },
                    {
                        id: '13',
                        text: '13',
                        state: 'alter',
                        children: [
                            {
                                id: '14',
                                text: '14',
                                state: 'normal'
                            },
                            {
                                id: '15',
                                text: '15',
                                state: 'alter',
                                prepose: '14'
                            },
                            {
                                id: '16',
                                text: '16',
                                state: 'alter',
                                prepose: '15'
                            }
                        ]
                    },
                    {
                        id: '17',
                        text: '17',
                        state: 'alter'
                    }
                ]
            },
            {
                id: '50',
                text: '50',
                state: 'normal',
                children: [
                    {
                        id: '51',
                        text: '51',
                        state: 'normal',
                        children: [
                            {
                                id: '52',
                                text: '52',
                                state: 'normal'
                            }
                        ]
                    }
                ]
            }
            ]
        }
    ];

    data2 = [
        {
            id: '1',
            text: '1',
            state: 'normal',
            children: [{
                id: '6',
                text: '6',
                state: 'normal',
                //expand: false,
                children: [
                    {
                        id: '7',
                        text: '7',
                        state: 'normal'
                    },
                    {
                        id: '8',
                        text: '8',
                        state: 'alter'
                    },
                    {
                        id: '9',
                        text: '9',
                        state: 'alter',
                        prepose: '8'
                    },
                    {
                        id: '10',
                        text: '10',
                        state: 'alter',
                        prepose: '9'
                    },
                    {
                        id: '11',
                        text: '11',
                        state: 'alter'
                    }
                ]
            },
            {
                id: '2',
                text: '2',
                state: 'delay',
                children: [
                    {
                        id: '41',
                        text: '41',
                        state: 'normal'
                    },
                    {
                        id: '42',
                        text: '42',
                        state: 'alter',
                        prepose: '41'
                    },
                    {
                        id: '43',
                        text: '43',
                        state: 'alter',
                        prepose: '42'
                    },
                    {
                        id: '44',
                        text: '44',
                        state: 'alter',
                        prepose: '44'
                    }
                ]
            },
            {
                id: '3',
                text: '3',
                state: 'delayFinished',
                children: [
                    {
                        id: '20',
                        text: '20',
                        state: 'normal'
                    },
                    {
                        id: '21',
                        text: '21',
                        state: 'alter',
                        children: [
                            {
                                id: '23',
                                text: '23',
                                state: 'normal'
                            },
                            {
                                id: '24',
                                text: '24',
                                state: 'alter',
                                prepose: '23'
                            },
                            {
                                id: '25',
                                text: '25',
                                state: 'alter',
                                prepose: '24'
                            }
                        ]
                    },
                    {
                        id: '22',
                        text: '22',
                        state: 'alter'
                    }
                ]

            },
            {
                id: '4',
                text: '4',
                state: 'normalFinished'
            }
            ]
        }
    ];

    lampmap.load(data);
    lampmap.render();
});