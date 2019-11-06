'use strict';

const Dispatch = require('micro-route/dispatch');
const Micro = require('micro');

const Helpers = require('./helpers');


const internals = {};


exports.start = function ({ port }) {

    const get = function (req, res) {

        Helpers.payload((response) => {

            Micro.send(res, 200, response);
        });
    };

    const routes = Dispatch()
        .dispatch('/', 'GET', get);

    const server = Micro(routes);

    server.listen(port);

    return Helpers.state(server);
};
