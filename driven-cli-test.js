#!/usr/bin/env node
var program = require('commander');
var chalk = require('chalk');

program
    .version('0.0.1')
    .option('-v, --verbose', 'Run in verbose mode')
    .parse(process.argv);


if(program.verbose) {
    console.log('Ok! I\'ll run the tests ' + chalk.bold.green('with') + ' the verbose mode');
} else {
    console.log('Ok! I\'ll run the tests ' + chalk.bold.red('without') + ' the verbose mode');
}
