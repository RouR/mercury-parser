const express = require('express');

const router = express.Router();
// const Mercury = require('@postlight/mercury-parser');
const Mercury = require('../dist/mercury');

const request = require('postman-request');

const MyConst = require('../routes/const')

/* GET home page. */
router.get('/', function(_, res) {
    res.send({ title: 'Welcome to Mercury Parser API', mercury: JSON.stringify(Mercury) });
});

router.get('/parse', async (req, res) => {
    const result = await Mercury.parse(req.query.url, {
        headers: {
            // Cookie: 'name=value; name2=value2; name3=value3',
            'User-Agent': MyConst.MyConst.userAgent,
        }
    });

    result["MyConst-User-Agent"] = MyConst.MyConst.userAgent;
    res.send(result)
    // res.send(result.content)
});

router.post('/parse-html', async (req, res) => {
  const result = await Mercury.parse(
    req.body.url,
    { contentType: 'html', html: req.body.html });

  res.send(result)
});

router.get('/ip', async (req, res) => {
    // var url = "http://httpbin.org/ip";
    var url = req.query.url;
    request(url, function (error, response, body) {
        // console.log('error:', error); // Print the error if one occurred
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        // console.log('body:', body); // Print the HTML for the Google homepage.
        res.send(body);
    });
});

router.get('/health', async (req, res) => {
    res.send("Ok");
});


module.exports = router;
