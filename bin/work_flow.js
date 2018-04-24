const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const child_process = require('child_process');
const helper = require('../utils/index.js');

module.exports = function(p, d) {
  fs.mkdir(path.join(p, d), (err) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: 'checkbox',
          message: '选择你需要的中间件',
          name: 'middlewares',
          choices: ['koa-bodyparser', 'koa-static', 'koa-router', 'koa-views']
        }
      ])
      .then(async answer => {
        try {
          process.chdir(`./${d}`);
          child_process.exec('npm init --force', (err) => {
            if (err) throw err;
            fs.readFile(path.join(p, d, 'package.json'), (err, data) => {
              if (err) throw err;
              let packageJson = JSON.parse(data.toString('utf-8'));
              packageJson['dependencies'] = {};
              let middlewares = answer.middlewares;
              middlewares.push('koa');

              helper.versionHelper(middlewares)
                .then(versionsObj => {
                  middlewares.forEach((item, index) => {
                    if (item === 'koa-router') {
                      helper.KoaRouterHelper(p, d);
                      packageJson['dependencies'][item] = `^${versionsObj[index]}`;
                    } else if (item === 'koa-views') {
                      helper.KoaTemplateHelper(p, d);
                      packageJson['dependencies'][item] = `^${versionsObj[index]}`;
                    } else if (item === 'koa-static') {
                      packageJson['dependencies'][item] = `^${versionsObj[index]}`;
                    } else if (item === 'koa-bodyparser') {
                      packageJson['dependencies'][item] = `^${versionsObj[index]}`;
                    } else if (item === 'koa') {
                      packageJson['dependencies'][item] = `^${versionsObj[index]}`;
                    }
                  });
                  
                  fs.writeFile(
                    path.join(p, d, 'package.json'),
                    JSON.stringify(packageJson, null, 2),
                    'utf8',
                    (err) => {
                      if (err) throw err;
                  });
                })

              
            })
          })
        } catch (e) {
          throw e;
        }
      })
  })
  
}
