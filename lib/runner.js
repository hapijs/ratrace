'use strict';

const Path = require('path');


const internals = {};


internals.execute = function () {

    let state = null;
    const stop = async () => {

        await state.stop();
        process.exit(0);
    };

    process.on('SIGINT', stop);

    process.on('message', async (msg) => {

        switch (msg.command) {
            case 'start':
                const framework = require(Path.join(__dirname, '..', 'frameworks', msg.name));

                state = await framework.start(msg.options);
                process.send({ status: 'started' });

                break;

            case 'stop':
                await stop();
                break;
        }
    });
};

internals.execute();
