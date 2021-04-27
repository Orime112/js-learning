/**
 * 写一个版本号比较函数
 *
 * 如果 ver1 > ver2，返回1；如果 ver1 < ver2，返回-1；其他情况返回0
 * 版本号规则`x.y.z`，xyz均为大于等于0的整数，至少有x位。
 *
 */

const { json } = require("sequelize")

function compare(ver1, ver2) {}

compare("0.1", "1.1.1") // 返回-1
compare("13.37", "1.2") // 返回1
compare("1.1", "1.1.0") // 返回0
