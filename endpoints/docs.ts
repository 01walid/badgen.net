import serve404 from '../libs/serve-404'
import serveHelp from '../libs/serve-help'
import { liveBadgeList } from '../libs/badge-list'

const badges = require('../static/.gen/badges.json')

// Handles `/docs/:name`
export default async function (req, res) {
  const [ , topic, name ] = req.url.split('/')

  if (liveBadgeList.includes(name)) {
    console.info(100, `${name}: ${req.url}`)
    try {
      const foundBadge = badges.live.find(b => b.id === name)
      if (foundBadge) {
        return serveHelp(req, res, name, foundBadge)
      }
    } catch (error) {
      if (error.code !== 'MODULE_NOT_FOUND') {
        console.error(error)
        throw error
      }
    }
  }

  serve404(req, res)
}
