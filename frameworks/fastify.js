'use strict';

const Fastify = require('fastify');

const Helpers = require('./helpers');


const internals = {};


exports.start = function ({ port }) {

    const server = Fastify();

    const get = function (req, reply) {

        Helpers.payload((response) => reply.send(response));
    };

    server.get('/', get);

    server.listen(port);

    return Helpers.state(server);
};
