const fs = require('fs');
const path = require('path');

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

module.exports = {
  KoaTemplateHelper,
  KoaRouterHelper
}