function number() {
  const div = document.createElement("div")
  div.innerHTML = 3000
  div.setAttribute("id", "number")
  document.body.appendChild(div)
}

module.exports = number
