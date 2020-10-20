const path = require('path')

let basePath = 'user/app'
let fileName = 'test.js'

const newPathJoin = path.join(basePath, 'api', fileName) // path.join只是单纯无脑拼接
const newPathResolve = path.resolve(basePath, 'api', fileName) // path.resolve力求拼接出一个绝对路径来 ---> 拼接过程中出现绝对路径则找到d:/接上完事，否则一直拼出__dirname
console.log({newPathJoin, newPathResolve})