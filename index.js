import express from "express"
import cors from "cors"
import { getJobs } from "./getJobs.js"

const app = express()
app.use(cors())

app.get("/api/", (req, res) => {
  res.send("Jobstreet API, try => /api/search?q=javascript")
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
