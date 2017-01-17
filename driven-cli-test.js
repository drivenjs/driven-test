#!/usr/bin/env node
const path = require('path')
const program = require('commander')
const chalk = require('chalk')
const fs = require('fs-sync')
const driven = require('drivenjs')
const drivenTest = driven.test

program
  .version('0.0.1')
  .option('-f, --file [url]', 'File or wildcard')
  .parse(process.argv)

program.file = program.file || path.join('**', 'test_*')

if(!path.isAbsolute(program.file)) {
  program.file = path.join(process.cwd(), program.file)
}

function openFiles(files) {
  files.forEach((file) => {
    require(`${file}`)
  })

  drivenTest.runner.run()

  if (!drivenTest.register.passed())
    process.exit(1)
}

files = fs.expand(program.file)

if (files.length == 0) {
  console.log(`No test files at ${program.file}`)
  process.exit(1)
}

openFiles(files)
