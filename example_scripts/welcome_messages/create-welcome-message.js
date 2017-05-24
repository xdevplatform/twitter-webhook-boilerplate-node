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

// welcome message params
var wm_params = {
  "welcome_message": {
    "message_data": {
      "text": "Hi! What can I do for you today?",
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

// request options
var request_options = {
  url: 'https://api.twitter.com/1.1/direct_messages/welcome_messages/new.json',
  oauth: twitter_oauth,
  json: true,
  headers: {
    'content-type': 'application/json'
  },
  body: wm_params
}

// POST request to create new welcome message
request.post(request_options, function (error, response, body) {

  if (error) {
    console.log('Error creating welcome message.')
    console.log(error)
    return;
  }

  // get welcome message ID
  var welcome_message_id = body.welcome_message.id;

  console.log('Welcome Message created:', welcome_message_id)

  // update request options
  request_options = {
    url: 'https://api.twitter.com/1.1/account/verify_credentials.json',
    oauth: twitter_oauth
  }

  // get current user info
  request.get(request_options, function (error, response, body) {

    if (error) {
      console.log('Error retreiving user data.')
      console.log(error)
      return;
    }

    // get welcome message ID
    var user_id = JSON.parse(body).id_str;

    // construct deeplink to welcome message
    var wm_deeplink = 'https://twitter.com/messages/compose?recipient_id=' + user_id + '&welcome_message_id=' + welcome_message_id
    
    console.log('Use this link to deeplink to this Welecome Message:', wm_deeplink)
  })
})