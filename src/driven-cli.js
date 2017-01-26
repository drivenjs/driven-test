#!/usr/bin/env node
var program = require('commander');

program
    .version('0.0.1')
    .command('test', 'Test this project')
    .parse(process.argv)
