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
        "text": "Flight SF8020 from San Francisco to Montreal is ahead of schedule and will land in approximately 15 minutes. Can we help with anything else?",
        "ctas": [
          {
            "type": "web_url",
            "label": "See flight details",
            "url": "https://dev.twitter.com"
          },
          {
            "type": "web_url",
            "label": "Map it",
            "url": "https://dev.twitter.com"
          },
          {
            "type": "web_url",
            "label": "Visit MyAirline.domain",
            "url": "https://dev.twitter.com"
          }
        ]
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