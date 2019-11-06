'use strict';

const internals = {
    delay: 0
};


exports.state = function (server) {

    return {
        stop: () => internals.stop(server)
    };
};


internals.stop = function (server) {

    return new Promise((resolve, reject) => {

        server.close((err) => {

            if (err) {
                reject();
                return;
            }

            resolve();
        });
    });
};


exports.payload = function (callback) {

    if (callback) {
        setTimeout(() => callback(internals.payload), internals.delay);
        return;
    }

    return new Promise((resolve) => setTimeout(() => resolve(internals.payload), internals.delay));
};


internals.payload = {
    a: 1,
    b: '2',
    c: {
        three: true
    }
};
