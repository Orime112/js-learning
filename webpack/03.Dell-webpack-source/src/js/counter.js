function counter() {
  const div = document.createElement("div")
  div.innerHTML = 1
  div.setAttribute("id", "counter")
  div.onclick = function () {
    div.innerHTML = parseInt(div.innerHTML) + 1
  }
  document.body.appendChild(div)
}

module.exports = counter
