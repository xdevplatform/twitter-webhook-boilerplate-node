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


var dm_params = {
  "event": {
    "type": "message_create",
    "message_create": {
      "target": {
        "recipient_id": "4534871"
      },
      "message_data": {
        "text": "Hello World!",
      }
    }
  }
}

twitter.post('direct_messages/events/new', dm_params, function (error, data, response) {

  if (error) {
    console.log('Error sending DM.');
    console.log(error);
    return;
  }

  console.log(data);

});