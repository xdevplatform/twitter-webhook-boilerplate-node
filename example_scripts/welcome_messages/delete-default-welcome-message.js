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
  url: 'https://api.twitter.com/1.1/direct_messages/welcome_messages/rules/list.json',
  oauth: twitter_oauth
}

// GET request to retreive current welcome message rules
request.get(request_options, function (error, response, body) {

  if (error) {
    console.log('Error creating welcome message.')
    console.log(error)
    return
  }

  var data = JSON.parse(body);

  // if welcome messages rule objects returned
  if (data.welcome_message_rules) {
    // get the ID of the rule
    var welcome_message_rule_id = data.welcome_message_rules[0].id

    console.log('Deleting current default welcome message:', welcome_message_rule_id)

    request_options = {
      url: 'https://api.twitter.com/1.1/direct_messages/welcome_messages/rules/destroy.json',
      oauth: twitter_oauth,
      qs: {
        id: welcome_message_rule_id
      }
    }

    // DELETE request to remove rule for default welcome message
    request.del(request_options, function (error, response, body) {
      if (error || response.statusCode != 204) {
        console.log('Error deleting welcome message rule.')
        console.log(error)
        return
      } else {
        console.log('Welcome message deleted.')
      }
    });
  }

  // no welcome messages rule objects returned
  else {
    console.log('No default welcome message has been set.')
  }
})
