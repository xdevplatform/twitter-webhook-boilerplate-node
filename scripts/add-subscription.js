var nconf = require('nconf');
var Twit = require('twit');


// load config
nconf.file({ file: 'config.json' }).env();

// setup Twitter API client
var twitter_config = {
  consumer_key: nconf.get('TWITTER_CONSUMER_KEY'),
  consumer_secret: nconf.get('TWITTER_CONSUMER_SECRET'),
  access_token: nconf.get('TWITTER_ACCESS_TOKEN'),
  access_token_secret: nconf.get('TWITTER_ACCESS_TOKEN_SECRET')
};
var twitter = new Twit(twitter_config);

var WEBHOOK_ID = 'your-webhook-id'


twitter.post('webhooks/subscriptions/direct_messages', { webhook_id: WEBHOOK_ID }, function (error, data, response) {

  if (response.statusCode == 204) {
    console.log('Subscription added.');
  } else {
    console.log('User has not authorized your app.')
  }

});