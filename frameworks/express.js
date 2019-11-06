'use strict';

const Express = require('express');

const Helpers = require('./helpers');


const internals = {};


exports.start = function ({ port }) {

    const app = Express();

    app.disable('etag');
    app.disable('x-powered-by');

    const get = function (req, res) {

        Helpers.payload((response) => res.json(response));
    };

    app.get('/', get);

    const server = app.listen(port);

    return Helpers.state(server);
};
