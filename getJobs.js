import axios from "axios"
import * as cheerio from "cheerio"

const url = "https://www.jobstreet.com.ph/"

const getJobs = async (searchStr) => {
  const query = !searchStr ? "jobs" : `${searchStr}-jobs`

  try {
    const { data: html } = await axios.get(url + query)
    const $ = cheerio.load(html)
    let jobs = []

    $("article.z1s6m00").each((index, element) => {
      const job = {}

      // scrape job link
      const link = $(element).find("h1 > a")
      job.link = link.attr("href")
        ? `https://www.jobstreet.com.ph${link.attr("href")}`
        : ""

      // scrape job title
      const title = $(element).find("h1 > a > div > span")
      job.title = title.text() || ""

      // scrape company
      const company = $(element).find("a[data-automation=jobCardCompanyLink]")
      job.company = company.text() || ""
      // scrape location
      const location = $(element).find("a[data-automation=jobCardLocationLink]")
      job.location = location.text() || ""

      // scrape salary
      const salary = $(element).find('span.z1s6m00:icontains("monthly")')
      job.salary = salary.text() || ""

      // scrape image
      const image = $(element).find("img.z1s6m00")
      job.image = image.attr("src") || null

      // give id
      job.id = index

      jobs = [...jobs, job]
    })

    return jobs
  } catch (e) {
    console.log(e)
    return null
  }
}

export { getJobs }
