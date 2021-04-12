const express = require("express")
const { nanoid } = require("nanoid")

const { SECRET_ID, SECRET_KEY } = process.env
console.log(`SECRET_ID, SECRET_KEY`, SECRET_ID, SECRET_KEY)

console.log(nanoid(4), "nanoid:4")

const app = express()

app.use(express.json())
app.use(express.urlencoded())

app.post("/create", (request, response) => {
  const { slug, url } = request.body
  response.send({ url, slug, date: Date.now() })
})

module.exports = app
