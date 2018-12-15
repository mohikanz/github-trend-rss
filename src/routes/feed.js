const Router = require('express').Router();

Router.get("/", (req, res) => {
  res.status(200).json({
    status: 200,
    message: "OK"
  });
});

module.exports = Router;