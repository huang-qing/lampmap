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
                state: 'normal'
            },
            {
                id: '2',
                text: '2',
                state: 'normal'
            },
            {
                id: '3',
                text: '3',
                state: 'delay'
            },
            {
                id: '4',
                text: '4',
                state: 'delayFinished'
            },
            {
                id: '5',
                text: '5',
                state: 'normalFinished'
            },
            {
                id: '6',
                text: '6',
                state: 'normal',
                children: [
                    {
                        id: '20',
                        text: '20',
                        state: 'normal'
                    },
                    {
                        id: '21',
                        text: '21',
                        state: 'alert',
                        children: [
                            {
                                id: '30',
                                text: '30',
                                state: 'normal'
                            },
                            {
                                id: '31',
                                text: '31',
                                state: 'alert'
                            },
                            {
                                id: '32',
                                text: '32',
                                state: 'alert'
                            }
                        ]
                    },
                    {
                        id: '22',
                        text: '22',
                        state: 'alert'
                    }
                ]
            },
            {
                id: '7',
                text: '7',
                state: 'normal'
            },
            {
                id: '8',
                text: '8',
                state: 'alert'
            },
            {
                id: '9',
                text: '9',
                state: 'alert'
            },
            {
                id: '10',
                text: '10',
                state: 'normal'
            },
            {
                id: '11',
                text: '11',
                state: 'normal'
            },
            {
                id: '12',
                text: '12',
                state: 'normal'
            },
            {
                id: '13',
                text: '13',
                state: 'normal'
            }
        ];

    lampmap.load(data);

    lampmap.render();
});