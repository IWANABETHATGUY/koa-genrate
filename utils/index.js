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
  })
}

/**
 * 
 * @param {string} p 进程工作的目录 
 * @param {string} d 项目的名称，也就是工作目录文件夹
 */
const KoaRouterHelper = (p, d) => {
  fs.mkdir(path.join(p, d, 'router'), (err) => {
    if (err) throw err;
  })
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
  })
}

const fetchAllNpmPackage = (packagelist) => {
  let promiseList = packagelist.map(item => {
    return fetchNpmPackageInfo(item);
  })
  return promiseList;
}

const versionHelper = async (packagelist) => {
  return Promise.all(fetchAllNpmPackage(packagelist));
}

module.exports = {
  KoaTemplateHelper,
  KoaRouterHelper,
  versionHelper
}