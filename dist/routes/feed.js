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
  feedLinks: {
    atom: 'https://rss.oldbigbuddha.net/feed'
  }
}); // const checkIfSinceModified = (ifModifiedSince, modified, notModified) => {
//   if (ifModifiedSince !== undefined && moment(ifModifiedSince).isAfter(updatedDate)) {
//     modified()
//   } else {
//     notModified()
//   }
// }

Router.get('/', (req, res) => {
  // const ifModifiedSince = req.getHeader('If-Modified-Since')
  // console.log(req.getHeader())
  // console.log(ifModifiedSince)
  // checkIfSinceModified(
  //   ifModifiedSince,
  //   () => res.status(304).send(),
  //   () => {
  const lang = req.query.lang;
  const period = req.query.period;
  (0, _trendingGithub.default)(period, lang).then(repos => {
    repos.forEach(repo => {
      feed.addItem({
        title: repo.name,
        id: repo.href,
        link: repo.href,
        description: repo.description,
        date: new Date()
      });
    });
    feed.addCategory('Technology');
    res.setHeader('Last-Modified', `${updatedDate.utcOffset('+00:00').format('ddd, DD MMM YYYY HH:mm:ss')} GMT`);
    res.status(200).send(feed.atom1());
  }); // })
});
module.exports = Router;