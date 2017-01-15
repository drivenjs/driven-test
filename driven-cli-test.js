#!/usr/bin/env node
const program = require('commander')
const chalk = require('chalk')
const fs = require('fs-sync')
const test = require('./src/test')

program
  .version('0.0.1')
  .option('-f, --file [url]', 'File or wildcard')
  .parse(process.argv)

program.file = program.file || './tests/test_of_*'

function openFiles(files) {
  files.forEach((file) => {
    require(`${file}`)
  })

  test.run()
  test.output()

  if (!test.passed())
    process.exit(1)
}

files = fs.expand(program.file)

if (files.length == 0) {
  console.log(`No test files at ${program.file}`)
  process.exit(1)
}

openFiles(files)
