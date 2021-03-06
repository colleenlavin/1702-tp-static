var express = require('express');

//const sequelize = require('sequelize');
const nunjucks = require('nunjucks');
const routes = require('./routes');
const models =  require('./models/index');
var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/bootstrap', express.static(path.join(__dirname, '/node_modules/bootstrap/dist')));
app.use('/jquery', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var env = nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use(morgan('dev'))

app.use('/', routes);

app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use(function (err, req, res, next) {
	console.error(err)
	res.status(500)
	res.send()
})

app.listen(3000, function () {
	console.log("Listening on 3000")
})
