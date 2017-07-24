var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var security = require('./security')
var message_processor = require('./message-processor')
var twitter = require('./twitter')

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')


console.log(twitter)


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

  if (crc_token) {
    var hash = security.get_challenge_response(crc_token, twitter.oauth.consumer_secret)

    response.status(200);
    response.send({
      response_token: 'sha256=' + hash
    })
  } else {
    response.status(400);
    response.send('Error: crc_token missing from request.')
  }
})


/**
 * Receives DM events
 **/
app.post('/webhooks/twitter', function(request, response) {

  // replace this with your own bot logic
  message_processor.process(request.body)

  response.send('200 OK')
})


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'))
})


