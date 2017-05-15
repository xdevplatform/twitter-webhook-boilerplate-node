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

// direct message request body
var dm_params = {
  "event": {
    "type": "message_create",
    "message_create": {
      "target": {
        "recipient_id": "4534871"
      },
      "message_data": {
        "text": "What color bird is your fav?",
        "quick_reply": {
          "type": "options",
          "options": [
            {
              "label": "Red Bird",
              "description": "A description about the red bird.",
              "metadata": "external_id_1"
            },
            {
              "label": "Blue Bird",
              "description": "A description about the blue bird.",
              "metadata": "external_id_2"
            },
            {
              "label": "Black Bird",
              "description": "A description about the black bird.",
              "metadata": "external_id_3"
            },
            {
              "label": "White Bird",
              "description": "A description about the white bird.",
              "metadata": "external_id_4"
            }
          ]
        }
      }
    }
  }
}

// request options
var request_options = {
  url: 'https://api.twitter.com/1.1/direct_messages/events/new.json',
  oauth: twitter_oauth,
  json: true,
  headers: {
    'content-type': 'application/json'
  },
  body: dm_params
}

// POST request to send Direct Message
request.post(request_options, function (error, response, body) {
  console.log(body)
})