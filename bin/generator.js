#! /usr/bin/env node
const program = require('commander');
const inq = require('./work_flow.js');

program.version('0.0.1');
// help 命令
program
  .command('help')
  .description('显示帮助信息')
  .action(function() {
    program.outputHelp();
  })

// create 命令
program
  .command('create [dir]')
  .description('创建一个新的koa项目')
  .action(function(dir) {
    inq(process.cwd(), dir);
  })

program.parse(process.argv);
