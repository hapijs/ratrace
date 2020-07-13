'use strict';

const internals = {};


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
        return callback(internals.payload);
    }

    return internals.payload;
};


internals.payload = {
    a: 1,
    b: '2',
    c: {
        three: true
    }
};
