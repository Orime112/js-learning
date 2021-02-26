const replacement = function (source){
  console.log(this.query)
  return source.replace('yy', 'xx')
}

module.exports = replacement