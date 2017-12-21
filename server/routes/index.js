var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

// send index file
// router.get('/', function(req, res, next) {
//   res.sendFile(__dirname + '/index.html');;
// });

router.get('/', function (req, res) {
    res.render('index', { user : req.user });
});

router.post('/', function(req, res) {
    res.type('text');
    res.write('halko post');
    res.end();
});

router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register', function(req, res, next) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
          return res.render('register', { error : err.message });
        }

        passport.authenticate('local')(req, res, function () {
            req.session.save(function (err) {
                if (err) {
                    return next(err);
                }
                res.redirect('/');
            });
        });
    });
});


router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});

// app.use(express.static(__dirname + '/public/'));
// app.use(router);
// app.listen(3000);

module.exports = router;
