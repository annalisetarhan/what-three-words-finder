var express = require('express');
var router = express.Router();
var us_states = require('../us_state.js');
var getThreeWords = require('../words_fetcher.js').getThreeWords;
require('promise');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Three Words Finder', states: us_states });
});

/* POST address and display corresponding what3words */
router.post('/', async function (req, res, next) {
    try {
        var threeWords = await getThreeWords(req.body);
        res.render('results', { words: threeWords });
    } catch (err) {
        console.log(err);
        res.render('index', { title: 'Three Words Finder', states: us_states });
    }
});

module.exports = router;