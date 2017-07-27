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

var number_of_webhooks = nconf.get('NUMBER_OF_WEBHOOKS')


/**
 * Serves the home page
 **/
app.get('/', function(request, response) {
  response.render('pages/index')
})

/**
 * Function for responding to the CRC check
 **/
function crc_check_responder(request, response) {
  var crc_token = request.query.crc_token

  var hash = security.get_challenge_response(crc_token, twitter_config.consumer_secret)

  response.send({
    response_token: 'sha256=' + hash
  })
}

/**
 * Processes a POST request.
 **/
function receive_post(request, response) {

  // Your custom bot logic will start here

  console.log(request.body)

  response.send('200 OK')
}

/** 
 * Create a webhook CRC check responder and POST recipient up to the # of configured webhooks
 * By default, this creates destinations in the format /webhooks/twitter/[webhook_number], where 
 * the webhook_number is a number from 1 to NUMBER_OF_WEBHOOKS in the config.
 **/
for (var webhook_number = 0; webhook_number < number_of_webhooks; webhook_number++) {
  /**
   * Receives challenge response check (CRC)
   **/
  app.get(`/webhooks/twitter/${webhook_number}`, crc_check_responder)

  /**
   * Receives DM events
   **/
  app.post(`/webhooks/twitter/${webhook_number}`, receive_post)
}


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'))
})


