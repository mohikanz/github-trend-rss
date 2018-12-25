"use strict";

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
const PORT = process.env.PORT || 3000;
app.disable('x-powered-by'); // APIのHeader設定

app.use((req, res, next) => {
  res.setHeader('Content-Language', 'ja');
  next();
});
app.use('/feed', require('./routes/feed.js'));
app.use('/', (req, res) => {
  res.status(200).send("I'm alive");
});
app.listen(PORT, () => {
  console.log(`Listen now\nport:${PORT}`);
});