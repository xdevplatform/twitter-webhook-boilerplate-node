var nconf = require('nconf')
var request = require('request')



var twitter = {}


// load config
nconf.file({ file: 'config.json' }).env();

twitter.oauth = {
  consumer_key: nconf.get('TWITTER_CONSUMER_KEY'),
  consumer_secret: nconf.get('TWITTER_CONSUMER_SECRET'),
  token: nconf.get('TWITTER_ACCESS_TOKEN'),
  token_secret: nconf.get('TWITTER_ACCESS_TOKEN_SECRET')
}


/**
 * Sends a Twitter Direct message with POST direct_messages/events/new
 * @param  message_event  valid Direct Message event json
 * @param  callback  function to pass response to
 */
twitter.send_direct_message = function (message_event, callback) {


  console.log('sending message:', message_event.event.message_create.message_data)

  // request options
  var request_options = {
    url: 'https://api.twitter.com/1.1/direct_messages/events/new.json',
    oauth: twitter.oauth,
    json: true,
    headers: {
      'content-type': 'application/json'
    },
    body: message_event
  }

  // POST request to send Direct Message
  request.post(request_options, function (error, response, body) {
    if(callback) {
      callback(error, response, body)
    }
  })
}


/**
 * Retieves user ID for access tokens in config
 * and adds it to twitter object
 */
function get_user_id() {

  request_options = {
    url: 'https://api.twitter.com/1.1/account/verify_credentials.json',
    oauth: twitter.oauth
  }

  // get current user info
  request.get(request_options, function (error, response, body) {

    if (error) {
      console.log('Error retreiving user data.')
      console.log(error)
      return;
    }
    
    var user_id = JSON.parse(body).id_str
    twitter.user_id = user_id
  })
}

get_user_id()


module.exports = twitter