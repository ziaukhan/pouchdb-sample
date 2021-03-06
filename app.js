/**
 * Created by ZiaKhan
 */

var express    = require('express'),
    bodyParser = require('body-parser'),
    morgan     = require('morgan');
var favicon = require('static-favicon');

var app = express();
app.set('port', (process.env.PORT || 9000));
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.use(favicon());
//using morgan logger
app.use(morgan('dev'));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get('*', function (req,res){
    res.render("index");
});



process.on('uncaughtException', function (err) {
    console.error(err);
    console.log("Node NOT Exiting...");
    console.log(err)

});
app.listen(app.get('port'), function() {
    console.log("Panacloud REST API Node app is running at localhost:" + app.get('port'));
});
