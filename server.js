var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var students = require('./routes/students');

var app = express();

//View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', (process.env.PORT || 5000));

app.engine('html', require('ejs').renderFile)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static(path.join(__dirname, './')))

app.use('/', index);
app.use('/api/', students);

app.get('/*', function(req, res) {
    // console.log('Redirecting to API')
    res.redirect('/api');
  });

app.listen(app.get('port'), function(){
    console.log('Server started on port ', app.get('port'))
});