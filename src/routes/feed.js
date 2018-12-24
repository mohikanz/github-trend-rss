import { Feed } from 'feed'
import trending from 'trending-github'
import Moment from 'moment'
const Router = require('express').Router()

// const updatedDate = new Date()
const updatedDate = Moment().hour(0).minute(0).second(0).millisecond(0)

const feed = new Feed({
  title: 'GitHub Trend RSS',
  description: 'GitHub Trend',
  id: 'https://github.com/trending',
  link: 'https://github.com/trending',
  generator: 'https://github.com/mohikanz/github-trend-rss',
  copyright: '(c) 2018 mohikanz',
  feedLinks: {
    atom: 'https://rss.oldbigbuddha.net/feed'
  }
})

Router.get('/', (req, res) => {
  const lang = req.query.lang
  const period = req.query.period

  trending(period, lang).then(repos => {
    repos.forEach(repo => {
      feed.addItem({
        title: repo.name,
        id: repo.href,
        link: repo.href,
        description: repo.description,
        date: new Date()
      })
    })

    feed.addCategory('Technology')

    console.log(updatedDate)
    res.setHeader('Last-Modified', `${updatedDate.utcOffset('+00:00').format('ddd, DD MMM YYYY HH:mm:ss')} GMT`)
    res.status(200).send(feed.atom1())
  })
})

module.exports = Router
