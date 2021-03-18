const child_process = require('child_process')

function attack(){
  child_process.exec('1+1')
}

module.exports = attack