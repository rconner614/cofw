var express = require('express');
var http = require('http');

var app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views/');
app.use(express.static(__dirname + '/public'));

app.get('*', function (req, res) {
    res.render('layout2', {
        title: 'Central Ohio Fiction Writers'
    });
});

app.listen(8081, function () {
    console.log('server listening on port', 8081);
});