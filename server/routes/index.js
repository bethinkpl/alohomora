
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(__dirname + '/index.html');;
});

router.post('/', function(req, res) {
    res.type('text');
    res.write('halko post');
    res.end();
});
// app.use(express.static(__dirname + '/public/'));
// app.use(router);
// app.listen(3000);

module.exports = router;
