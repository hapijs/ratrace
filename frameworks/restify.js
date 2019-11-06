'use strict';

const Restify = require('restify');

const Helpers = require('./helpers');


const internals = {};


exports.start = function ({ port }) {

    const server = Restify.createServer();

    const get = function (req, res) {

        Helpers.payload((response) => {

            res.send(response);
        });
    };

    server.get('/', get);

    server.listen(port);

    return Helpers.state(server);
};
