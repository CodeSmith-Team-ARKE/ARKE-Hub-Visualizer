#!/usr/bin/env node --harmony

//Dependencies
const fs = require('fs')
const path = require('path')
const program = require('commander');
const co = require('co');
const prompt = require('co-prompt');
const useAccessObject = require('./server.js');
const chalk = require('chalk')
const log = console.log

///Welcome graphic

log('')
log(chalk.bold('               Welcome to'))
log('    ||--------------<>-------------||')
log('   ||----------<>        <>----------||')
log('  ||-----<>                    <>-----||')
log(' ||---<>             d8b           <>---||')
log('||<>                  ?88              <>||')
log("||                     88b               ||")
log("|| d888b8b    88bd88b   888  d88' d8888b ||")
log("|| d8P' ?88    88P'  `  888bd8P' d8b_,dP ||")
log("|| 88b  ,88b  d88      d88888b   88b     ||")
log("|| `?88P'`88bd88'     d88' `?88b,`?888P' ||")
log('')
log(chalk.bold('Please enter your AWS Security Credentials'))

// user input prompts
program
  .arguments('')
  .action(() => {
    co(function *(){
      let userAccessKeyId = yield prompt('AWS Access Key ID: ');
      let userSecretAccessKey = yield prompt.password('AWS Secret Key: ')
      let userRegion = yield prompt('AWS Region: ')
      //invokes wrapper function with server.js code
      useAccessObject({accessKeyId: userAccessKeyId, secretAccessKey: userSecretAccessKey, region: userRegion})
    })
  })
  .parse(process.argv)
