'use strict';

const Polka = require('polka');

const Helpers = require('./helpers');


const internals = {};


exports.start = function ({ port }) {

    const app = Polka();

    const get = function (req, res) {

        Helpers.payload((response) => {

            res.setHeader('content-type', 'application/json; charset=utf-8');
            res.end(JSON.stringify(response));
        });
    };

    app.get('/', get);

    const { server } = app.listen(port);

    return Helpers.state(server);
};
