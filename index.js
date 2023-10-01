import express from "express"
import cors from "cors"
import { getJobs } from "./getJobs.js"

const app = express()
app.use(cors())

app.get("/", (req, res) => {
  res.send(`<h1>Welcome to Jobstreet API!</h1>
  <span>Try this api route => <code>/api/search?q=javascript</code></span>
  <p>See this <a href="https://github.com/loydcose/jobstreet-api">repo</a> for more information, enjoy!</p>`)
})

app.get("/api/search", async (req, res) => {
  const searchTerm = req.query.q
  const jobRes = await getJobs(searchTerm || null)
  res.json(jobRes)
})

const port = process.env.port || 5000

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
