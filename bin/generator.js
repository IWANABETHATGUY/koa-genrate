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

program
  .command('preview [dir]')
  .description('实时预览')
  .action(function(dir) {
    // console.log(process.cwd());
    // // console.log('preview %s', dir);
  })

program
  .command('build [dir]')
  .description('生成整站静态html')
  .option('-o, --output <div>', '生成静态html存放的目录')
  .action(function(dir, options) {
    console.log('create %s, output %s', dir, options.output);
  })

program.parse(process.argv);