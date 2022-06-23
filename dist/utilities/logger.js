'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var logger = function (req, res, next) {
  console.log(
    'user requested access to '
      .concat(req.query.imageName, ' with height ')
      .concat(req.query.height, ' and width ')
      .concat(req.query.width)
  );
  next();
};
exports.default = logger;
