function es6test() {
  const a = 12
  let b = 24
  return new Promise(() => {
    console.log("这里是promise")
  })
}

module.exports = es6test
