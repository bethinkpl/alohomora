var express  = require('express');
var app      = express();
var router   = express.Router();
const config = {
	PORT: 3000,
}

/* GET home page. */
router.get('/', function (req, res) {
	res.sendFile('index.html');
});

router.post('/', function (req, res) {
	console.log('post halko');
	res.type('text');
	res.write('halko post');
	res.end();
});
app.use(express.static(__dirname + '/server/public/'));
app.use(router);
app.listen(config.PORT);
console.log(`Starting web server on port 3000 ${config.PORT}`);

module.exports = router;
