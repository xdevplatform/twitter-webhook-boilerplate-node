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


// request options
var request_options = {
  url: 'https://api.twitter.com/1.1/account_activity/webhooks.json',
  oauth: twitter_oauth
}

// GET request to retreive webhook config
request.get(request_options, function (error, response, body) {
  console.log(body)
})