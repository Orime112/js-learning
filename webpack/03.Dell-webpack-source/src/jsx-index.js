import React from "react"
import ReactDOM from "react-dom"
import Child from "@/jsx/Child"

function App() {
  return (
    <div>
      这是App根组件!!!
      <Child />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
