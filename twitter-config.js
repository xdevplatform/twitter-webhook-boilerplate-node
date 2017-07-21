var nconf = require('nconf')
var request = require('request')

// load config
nconf.file({ file: 'config.json' }).env();

var twitter_config = {
  oauth: {
    consumer_key: nconf.get('TWITTER_CONSUMER_KEY'),
    consumer_secret: nconf.get('TWITTER_CONSUMER_SECRET'),
    token: nconf.get('TWITTER_ACCESS_TOKEN'),
    token_secret: nconf.get('TWITTER_ACCESS_TOKEN_SECRET')
  }
}


/**
 * Retieves user ID for access tokens in config
 * and adds it to twitter_config object
 */
function get_user_id() {

  request_options = {
    url: 'https://api.twitter.com/1.1/account/verify_credentials.json',
    oauth: twitter_config.oauth
  }

  // get current user info
  request.get(request_options, function (error, response, body) {

    if (error) {
      console.log('Error retreiving user data.')
      console.log(error)
      return;
    }
    
    var user_id = JSON.parse(body).id_str
    twitter_config.user_id = user_id
  })
}

get_user_id()


module.exports = twitter_config