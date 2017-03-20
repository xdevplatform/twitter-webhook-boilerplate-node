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
  "welcome_message": {
    "message_data": {
      "text": "Hi! What can I help you with today?",
      "quick_reply": {
        "type": "options",
        "options": [
          {
            "label": "Order Status",
            "description": "Check the status of an order recently placed.",
            "metadata": "external_id_1"
          },
          {
            "label": "Return",
            "description": "Return a product you received less than 30 days ago.",
            "metadata": "external_id_2"
          },
          {
            "label": "Change Order",
            "description": "Update or cancel an order recently placed.",
            "metadata": "external_id_3"
          },
          {
            "label": "Talk to a Human",
            "description": "Talk with a customer service agent.",
            "metadata": "external_id_4"
          }
        ]
      }
    }
  }
}

// create new welcome message
twitter.post('direct_messages/welcome_messages/new', dm_params, function (error, data, response) {

  if (error) {
    console.log('Error creating welcome message.');
    console.log(error);
    return;
  }

  console.log(data);

  // get welcome message ID
  var welcome_message_id = data.welcome_message.id;

  // get user ID to construct deeplink
  twitter.get('account/verify_credentials', {}, function (error, data, response) {

    if (error) {
      console.log('Error retreiving user data.');
      console.log(error);
      return;
    }

    // get the user ID
    var user_id = data.id_str;

    // construct deeplink to welcome message
    console.log('Welcome Message Deeplink:', 'https://twitter.com/messages/compose?recipient_id=' + user_id + '&welcome_message_id=' + welcome_message_id)
    
    callback();
  });
  
});

