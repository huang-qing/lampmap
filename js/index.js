/* global $ LampMap */
$(function () {
    var options = {
            container: $('#lampmap')[0]
        },
        lampmap = new LampMap(options),
        data = [
            {
                id: '1',
                text: '1',
                state: 'normal',
                children: [{
                    id: '1-1',
                    text: '1-1',
                    state: 'normal',
                    //expand: false,
                    children: [
                        {
                            id: '1-1-1',
                            text: '1-1-1',
                            state: 'normal'
                        },
                        {
                            id: '1-1-2',
                            text: '1-1-2',
                            state: 'alter',
                            children: [
                                {
                                    id: '1-1-2-1',
                                    text: '1-1-2-1',
                                    state: 'normal'
                                },
                                {
                                    id: '1-1-2-2',
                                    text: '1-1-2-2',
                                    state: 'alter'
                                },
                                {
                                    id: '1-1-2-3',
                                    text: '1-1-2-3',
                                    state: 'alter'
                                }
                            ]
                        },
                        {
                            id: '1-1-3',
                            text: '1-1-3',
                            state: 'alter',
                            prepose: '1-1-2'
                        },
                        {
                            id: '1-1-4',
                            text: '1-1-4',
                            state: 'alter',
                            prepose: '1-1-2'
                        },
                        {
                            id: '1-1-5',
                            text: '1-1-5',
                            state: 'alter'
                        }
                    ]
                },
                {
                    id: '1-2',
                    text: '1-2',
                    state: 'delay',
                },
                {
                    id: '1-3',
                    text: '1-3',
                    state: 'delayFinished'
                },
                {
                    id: '1-4',
                    text: '1-4',
                    state: 'normalFinished'
                },
                {
                    id: '1-5',
                    text: '1-5',
                    state: 'normal',
                    children: [
                        {
                            id: '1-5-1',
                            text: '1-5-1',
                            state: 'normal'
                        },
                        {
                            id: '1-5-2',
                            text: '1-5-2',
                            state: 'alter',
                            children: [
                                {
                                    id: '1-5-2-1',
                                    text: '1-5-2-1',
                                    state: 'normal'
                                },
                                {
                                    id: '1-5-2-2',
                                    text: '1-5-2-2',
                                    state: 'alter',
                                    prepose: '1-1-4'
                                },
                                {
                                    id: '1-5-2-3',
                                    text: '1-5-2-3',
                                    state: 'alter',
                                    prepose: '1-1-4'
                                }
                            ]
                        },
                        {
                            id: '1-5-3',
                            text: '1-5-3',
                            state: 'alter'
                        }
                    ]
                }
                    // {
                    //     id: '7',
                    //     text: '7',
                    //     state: 'normal'
                    // },
                    // {
                    //     id: '8',
                    //     text: '8',
                    //     state: 'alter'
                    // },
                    // {
                    //     id: '9',
                    //     text: '9',
                    //     state: 'alter'
                    // },
                    // {
                    //     id: '10',
                    //     text: '10',
                    //     state: 'normal'
                    // },
                    // {
                    //     id: '11',
                    //     text: '11',
                    //     state: 'normal'
                    // },
                    // {
                    //     id: '12',
                    //     text: '12',
                    //     state: 'normal'
                    // },
                    // {
                    //     id: '13',
                    //     text: '13',
                    //     state: 'normal'
                    // }
                ]
            }
        ];

    lampmap.load(data);

    lampmap.render();
});