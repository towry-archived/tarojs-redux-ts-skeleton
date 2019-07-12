var express = require('express');

var router = express.Router();
module.exports = router;

router.post('/api/login', function (req, res) {
  setTimeout(function () {
    res.json({
      errCode: 0,
      errMsg: 'ok',
      data: {
        authToken: 'auth token',
        user: {
          id: 1,
          name: 'uname',
        }
      }
    });
  }, 0);
});
