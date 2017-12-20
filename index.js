var express = require('express');
var app = express();
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.sendFile('index.html');
});

router.post('/', function(req, res) {
    console.log('post halko');
    res.type('text');
    res.write('halko post');
    res.end();
});
app.use(express.static(__dirname + '/server/public/'));
app.use(router);
app.listen(3000);

module.exports = router;
