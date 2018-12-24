"use strict";

var _feed = require("feed");

var _trendingGithub = _interopRequireDefault(require("trending-github"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Router = require('express').Router(); // const updatedDate = new Date()


const updatedDate = (0, _moment.default)().hour(0).minute(0).second(0).millisecond(0);
const feed = new _feed.Feed({
  title: 'GitHub Trend RSS',
  description: 'GitHub Trend',
  id: 'https://github.com/trending',
  link: 'https://github.com/trending',
  generator: 'https://github.com/mohikanz/github-trend-rss',
  copyright: '(c) 2018 mohikanz',
  updated: updatedDate,
  feedLinks: {
    atom: 'https://rss.oldbigbuddha.net/feed'
  }
});
Router.get('/', (req, res) => {
  const lang = req.query.lang;
  const period = req.query.period;
  (0, _trendingGithub.default)(period, lang).then(repos => {
    repos.forEach(repo => {
      feed.addItem({
        title: repo.name,
        id: repo.href,
        link: repo.href,
        description: repo.description,
        date: updatedDate
      });
    });
    feed.addCategory('Technology');
    console.log(updatedDate);
    res.setHeader('Last-Modified', `${updatedDate.utcOffset('+00:00').format('ddd, DD MMM YYYY HH:mm:ss')} GMT`);
    res.status(200).send(feed.atom1());
  });
});
module.exports = Router;