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


// get current welcome message rules
twitter.get('direct_messages/welcome_messages/rules/list', {}, function (error, data, response) {

  if (error) {
    console.log('Error creating welcome message.');
    console.log(error);
    return;
  }
  
  // if welcome messages rule objects returned
  if (data.welcome_message_rules) {
    console.log('Deleting current default welcome message.');

    // get the ID of the rule
    var welcome_message_rule_id = data.welcome_message_rules[0].id;

    // delete welcome message rule
    twitter.del('direct_messages/welcome_messages/rules/destroy', { id: welcome_message_rule_id }, function (error, data, response) {
      if (error) {
        console.log('Error deleting welcome message rule.');
        console.log(error);
        return;
      } else {
        console.log('Welcome message deleted.');
      }
    });
  }
  // no welcome messages rule objects returned
  else {
    console.log('No default welcome message has been set.')
  }

});