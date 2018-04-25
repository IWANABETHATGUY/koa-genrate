const fs = require('fs');
const path = require('path');
const an = require('api-npm');

/**
 * 
 * @param {string} p 进程工作的目录 
 * @param {string} d 项目的名称，也就是工作目录文件夹
 */
const KoaTemplateHelper = (p, d) => {
  fs.mkdir(path.join(p, d, 'views'), (err) => {
    if (err) throw err;
  });
}

/**
 * 
 * @param {string} p 进程工作的目录 
 * @param {string} d 项目的名称，也就是工作目录文件夹
 */
const KoaRouterHelper = (p, d) => {
  fs.mkdir(path.join(p, d, 'router'), (err) => {
    if (err) throw err;
  });
}
// fs.mkdir('./test', (err) => {
//   if (err) throw err;
// })

const fetchNpmPackageInfo = (package) => {
  return new Promise((resolve, reject) => {
    try {
      an.getdetails(package, (res) => {
        let result = res['dist-tags']['latest'];
        let key = package.toString();
        resolve(result);
      })
    } catch (err) {
      reject(err);
    }
  });
}

const fetchAllNpmPackage = (packagelist) => {
  let promiseList = packagelist.map(item => {
    return fetchNpmPackageInfo(item);
  })
  return promiseList;
}

const versionHelper = (packagelist) => {
  return Promise.all(fetchAllNpmPackage(packagelist));
}

const koaHelper = function(p, d) {
  fs.writeFile(path.join(p, d, 'app.js'), 
`const Koa = require('koa');

const app = new Koa();

app.use(async (ctx, next) => {
  ctx.body = 'hello world';
  next();
});
app.listen(3000, () => {
  console.log('server listening at port 3000');
})
`,
  'utf-8',
  (err) => {
    if (err) throw err;
  })
}
module.exports = {
  KoaTemplateHelper,
  KoaRouterHelper,
  versionHelper,
  koaHelper
}