/**
 * UPDATE WEBHOOK STEPS
 * 1. Retreive current webhook config
 * 2. Remove subscription for user on current webhook config
 * 3. Delete current webhook config
 * 4. Create new webhook config with new URL
 * 5. Add subscription for user
 */


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

var WEBHOOK_URL = 'https://your-webhook-url'


/**
 * Retrieves webhook configuration
 */
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


/**
 * Removes existing subscription
 * for user context of provided access tokens
 */
function removeSubscription(config_id) {
  // request options
  var request_options = {
    url: 'https://api.twitter.com/1.1/account_activity/webhooks/' + config_id + '/subscriptions.json',
    oauth: twitter_oauth
  }

  // DELETE request to remove subscription
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


/**
 * Deletes webhook configuration
 */
function deleteConfig(config_id) {
  // request options
  var request_options = {
    url: 'https://api.twitter.com/1.1/account_activity/webhooks/' + config_id + '.json',
    oauth: twitter_oauth
  }

  // DELETE request to delete webhook config
  request.del(request_options, function (error, response, body) {
    if (error || response.statusCode != 204) {
      console.log('Error deleting webhook config.')
      return
    } else {
      console.log('Webhook config deleted.')
      createConfig()
    }
  })
}


/**
 * Create new webhook configuration
 */
function createConfig() {
  // request options
  var request_options = {
    url: 'https://api.twitter.com/1.1/account_activity/webhooks.json',
    oauth: twitter_oauth,
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    form: {
      url: WEBHOOK_URL
    }
  }

  // POST request to create webhook config
  request.post(request_options, function (error, response, body) {
    if (response.statusCode != 200) {
      console.log('Error creating webhook config.')
      console.log(body)
    } else {
      var config = JSON.parse(body)
      console.log('Webhook config created.')
      addSubscription(config.id)
    }
  })
}


/**
 * Adds webhook subscription subscription
 * for user context of provided access tokens
 */
function addSubscription(webhook_id) {
  // request options
  var request_options = {
    url: 'https://api.twitter.com/1.1/account_activity/webhooks/' + webhook_id + '/subscriptions.json',
    oauth: twitter_oauth
  }

  // POST request to create webhook config
  request.post(request_options, function (error, response, body) {

    if (response.statusCode == 204) {
      console.log('Subscription added.')
    } else {
      console.log('User has not authorized your app.')
    }
  })
}


getConfig()