'use strict';

const ChildProcess = require('child_process');
const Path = require('path');

const Beam = require('@commercial/beam');
const Ora = require('ora');
const Teamwork = require('@hapi/teamwork');


const internals = {
    port: 3000,
    warmup: 5000,
    measure: 5000,

    defaults: {
        connections: 100,
        pipelines: 10
    }
};


internals.frameworks = {
    node: { version: process.version.slice(1) },
    express: {},
    fastify: {},
    hapi: { org: 'hapi' },
    koa: {},
    micro: {},
    polka: {},
    restify: {}
};


exports.execute = async function () {

    let forked;

    process.on('SIGINT', () => {

        if (forked) {
            forked.kill('SIGINT');
            console.log();
            process.exit(0);
        }
    });

    for (const name in internals.frameworks) {
        const framework = internals.frameworks[name];
        const version = framework.version || require(`${framework.org ? `@${framework.org}/` : ''}${name}/package.json`).version;

        // Start

        const spinner = Ora(`Started ${name}`).start();
        forked = ChildProcess.fork(Path.join(__dirname, 'runner'));

        const started = new Teamwork.Team();
        forked.once('message', () => started.attend());
        forked.send({ command: 'start', name, options: { port: internals.port } });
        await started.work;

        // Warm up

        spinner.text = `Warming ${name}`;
        const warmup = new Beam(Object.assign({ port: internals.port, duration: internals.warmup }, internals.defaults));
        await warmup.execute();

        // Measure

        spinner.text = `Working ${name}`;
        const measure = new Beam(Object.assign({ port: internals.port, duration: internals.measure }, internals.defaults));
        const result = await measure.execute();

        spinner.text = `Completed ${name} v${version} - ${result.requests.mean}`;
        spinner.succeed();

        // Stop

        const stopped = new Teamwork.Team();
        forked.once('exit', () => stopped.attend());
        forked.send({ command: 'stop' });
        await stopped.work;
    }
};
