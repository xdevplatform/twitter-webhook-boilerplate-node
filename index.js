var express = require('express')
var security = require('./security')
var bodyParser = require('body-parser')
var nconf = require('nconf')
var app = express()


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')


// load config
nconf.file({ file: 'config.json' }).env();

var twitter_config = {
  consumer_key: nconf.get('TWITTER_CONSUMER_KEY'),
  consumer_secret: nconf.get('TWITTER_CONSUMER_SECRET'),
  access_token: nconf.get('TWITTER_ACCESS_TOKEN'),
  access_token_secret: nconf.get('TWITTER_ACCESS_TOKEN_SECRET')
}


/**
 * Serves the home page
 **/
app.get('/', function(request, response) {
  response.render('pages/index')
})


/**
 * Receives challenge response check (CRC)
 **/
app.get('/webhooks/twitter', function(request, response) {

  var crc_token = request.query.crc_token

  var hash = security.get_challenge_response(crc_token, twitter_config.consumer_secret)

  response.send({
    response_token: 'sha256=' + hash
  })
})


/**
 * Receives DM events
 **/
app.post('/webhooks/twitter', function(request, response) {

  // Your custom bot logic will start here

  console.log(request.body)

  response.send('200 OK')
  
})


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'))
})


