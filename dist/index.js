'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
var express_1 = __importDefault(require('express'));
var api_1 = __importDefault(require('./routes/api/api'));
var app = (0, express_1.default)();
var port = 3000;
app.use('/api/images', api_1.default);
app.get('/', function (req, res) {
  res.status(200).send('it works!');
});
app.get('/api', function (req, res) {
  res.status(200).send('api works!');
});
app.listen(port, function () {
  console.log('server is running at http://localhost:'.concat(port));
});
exports.default = app;
