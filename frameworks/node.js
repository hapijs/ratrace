'use strict';

const Http = require('http');

const Helpers = require('./helpers');


const internals = {};


exports.start = function ({ port }) {

    const handler = function (req, res) {

        const headers = {
            'content-type': 'application/json; charset=utf-8'
        };

        if (req.url === '/') {
            Helpers.payload((response) => {

                res.writeHead(200, headers);
                res.end(JSON.stringify(response));
            });

            return;
        }

        res.writeHead(404, headers);
        res.setHeader();
        res.end(JSON.stringify({ error: 'not found' }));
    };

    const server = Http.createServer(handler);

    server.listen(port);

    return Helpers.state(server);
};
