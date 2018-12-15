const Router = require('express').Router();
import trending from 'trending-github';

Router.get("/", (req, res) => {
  const lang   = req.query.lang;
  const period = req.query.period;

  trending(period, lang).then(repos => {
    res.status(200).json(repos);
  })
});

module.exports = Router;