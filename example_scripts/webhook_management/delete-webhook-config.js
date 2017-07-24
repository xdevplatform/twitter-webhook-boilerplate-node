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

var WEBHOOK_URL = 'https://8f2a1ddc.ngrok.io'


function getConfig() {
  // request options
  var request_options = {
    url: 'https://api.twitter.com/1.1/account_activity/webhooks.json',
    oauth: twitter_oauth
  }

  // GET request to retreive webhook config
  request.get(request_options, function (error, response, body) {
    var configs = JSON.parse(body)

    if (configs.length > 0) {
      current_config = configs[0]
      console.log(current_config)
      removeSubscription(current_config.id);
    } else {
      console.log('App does not have a webhook config.')
      createConfig()
    }
  })
}


function removeSubscription(config_id) {
  // request options
  var request_options = {
    url: 'https://api.twitter.com/1.1/account_activity/webhooks/' + config_id + '/subscriptions.json',
    oauth: twitter_oauth
  }

  // POST request to create webhook config
  request.delete(request_options, function (error, response, body) {

    if (response.statusCode == 204) {
      console.log('Subscription removed.')
      deleteConfig(config_id)
    } else {
      console.log('User has not authorized your app or subscription not found.')
      deleteConfig(config_id)
    }
  })
}


function deleteConfig(config_id) {
  // request options
  var request_options = {
    url: 'https://api.twitter.com/1.1/account_activity/webhooks/' + config_id + '.json',
    oauth: twitter_oauth
  }

  // GET request to retreive webhook config
  request.del(request_options, function (error, response, body) {
    if (error || response.statusCode != 204) {
      console.log('Error deleting webhook config.')
      return
    } else {
      console.log('Webhook config deleted.')
    }
  })
}


getConfig()