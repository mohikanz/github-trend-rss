const Router = require('express').Router();
import { Feed } from 'feed';
import trending from 'trending-github';
import Moment from 'moment-timezone';

const updatedDate = new Date();

updatedDate.setHours(0);
updatedDate.setMinutes(0);
updatedDate.setSeconds(0);
updatedDate.setMilliseconds(0);


const feed = new Feed({
  title: "GitHub Trend RSS",
  description: "GitHub Trend",
  id: "https://github.com/trending",
  link: "https://github.com/trending",
  generator: "https://github.com/mohikanz/github-trend-rss",
  copyright: "(c) 2018 mohikanz",
  updated: updatedDate,
  feedLinks: {
    atom: "https://rss.oldbigbuddha.net/feed"
  }
});

Router.get("/", (req, res) => {

  const lang   = req.query.lang;
  const period = req.query.period;

  trending(period, lang).then(repos => {
    repos.forEach(repo => {
      feed.addItem({
        title: repo.name,
        id: repo.href,
        link: repo.href,
        description: repo.description,
        date: updatedDate
      });
    });

    feed.addCategory("Technology");

    console.log(updatedDate);
    res.setHeader("Last-Modified", updatedDate);
    res.status(200).send(feed.atom1());

  });

});

module.exports = Router;