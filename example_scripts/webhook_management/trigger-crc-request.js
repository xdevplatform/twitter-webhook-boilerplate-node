var nconf = require('nconf')
var request = require('request')


// load config
nconf.file({ file: 'config.json' }).env()

// twitter authentication
var twitter_oauth = {
  consumer_key: nconf.get('TWITTER_CONSUMER_KEY'),
  consumer_secret: nconf.get('TWITTER_CONSUMER_SECRET'),
  token: nconf.get('TWITTER_ACCESS_TOKEN'),
  token_secret: nconf.get('TWITTER_ACCESS_TOKEN_SECRET')
}

var WEBHOOK_ID = 'your-webhook-id'


// request options
var request_options = {
  url: 'https://api.twitter.com/1.1/account_activity/webhooks/' + WEBHOOK_ID + '.json',
  oauth: twitter_oauth
}

// POST request to create webhook config
request.put(request_options, function (error, response, body) {
  console.log(response.statusCode)

  if (response.statusCode == 429) {
    console.log('Rate limit exceeded.')
  }
  else if (response.statusCode == 214) {
    console.log('Webhook URL does not meet the requirements.')
  }
  else if (response.statusCode == 204) {
    console.log('CRC request successful and webhook status set to valid.')
  }
})