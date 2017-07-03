var express = require('express');
var http = require('http');
var path = require('path');
var util = require('util');
var bodyParser = require('body-parser');
var fs = require('fs');
var port = process.env.NODE_ENV == 'p' ? 80 : 8080;
var config = JSON.parse(fs.readFileSync(__dirname + '/config.json', 'utf8'));
var mailgun = require('mailgun-js')({apiKey: config.apiKey, domain: config.domain});

var app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views/');
app.use(express.static(__dirname + '/public'));

function sendEmail(obj){
    var send = {
        from: 'COFW Website <donotreply@cofwevents.org>',
        to: obj.toEmail,
        subject: obj.subject,
        text: obj.text
    };
    mailgun.messages().send(send, function(error, body){
        if(error){
            console.log(error);
            return {error: error, body: body};
        } else {
            return {body: body};
        }
    });
}

app.get('/robots.txt', function(req, res){
    var filepath = __dirname + '/robots.txt';
    var stat = fs.statSync(filepath);
    res.writeHead(200, {'Content-Type': "text/plain" });
    fs.createReadStream(filepath).pipe(res);
});

app.post('/email-send', function (req, res) {
    var answer = sendEmail(req.body);
    res.json({response: answer});
});

app.get('*', function (req, res) {
    res.render('layout', {
        title: 'Central Ohio Fiction Writers'
    });
});

app.listen(port, function () {
    console.log('server listening on port', port);
});