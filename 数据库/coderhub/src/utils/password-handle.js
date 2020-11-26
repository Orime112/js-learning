const crypto = require('crypto')

const md5password = (password) => {
  let result = String(password)
  try{
    const md5 = crypto.createHash('md5')
    result = md5.update(result).digest('hex')
  }catch(e){
    console.log(e, 'md5 error')
  }
  return result
}

module.exports = md5password