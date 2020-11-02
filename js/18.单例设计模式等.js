let module1 = (function () {
  function tools() {
    console.log("我是tools执行")
  }
  function share() {}

  return {
    name: "house",
    tools,
  }
})()
module1.tools()

let module2 = {
  tools() {
    console.log("我是tools执行")
  },
  share() {},
  name: 'house'
}
module2.tools()