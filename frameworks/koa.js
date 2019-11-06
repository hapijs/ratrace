'use strict';

const Koa = require('koa');
const Router = require('koa-router');

const Helpers = require('./helpers');


const internals = {};


exports.start = function ({ port }) {

    const app = new Koa();
    const router = Router();

    const get = async function (ctx) {

        ctx.body = await Helpers.payload();
    };

    router.get('/', get);

    app.use(router.routes());
    app.on('error', (ignoreErr) => { });

    const server = app.listen(port);

    return Helpers.state(server);
};
