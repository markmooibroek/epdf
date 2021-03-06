#!/usr/bin/env node
'use strict'

const args = require('yargs').argv
const {omitBy, yargsSpecialKey} = require('../lib/utils')
const {render} = require('../lib')

const toStdout = !args.out

render(omitBy(yargsSpecialKey, args))
  .mapResult(out => {
    if (toStdout && out) process.stdout.write(out)
    process.exitCode = 0
  })
  .mapError(err => {
    console.error(err)
    process.exitCode = 1
  })
