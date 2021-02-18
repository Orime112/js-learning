const btn = document.createElement("button")
btn.innerHTML = "点击新增"
document.body.appendChild(btn)

btn.onclick = function () {
  const div = document.createElement("div")
  div.innerHTML = "Itemf"
  document.body.appendChild(div)
}
