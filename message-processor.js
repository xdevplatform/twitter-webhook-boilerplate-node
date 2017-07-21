var _ = require('lodash');
var twitter_config = require('./twitter-config.js')
var messages = require('./messages')

var mp = {}


/**
 * Processes incomming events
 * @param  payload  the incomming webhook json payload
 */
mp.process = function(payload) {

  // check for direct message events
  if(payload.direct_message_events) {
    // loop through each event
    _.forEach(payload.direct_message_events, function(message_event) {
      // check if event is a message_create event and if it is incomming
      if(message_event.type == 'message_create' && message_event.message_create.sender_id !== twitter_config.user_id) {
        // process each event individually
        mp.process_message_event(message_event)
      }
    });
  }
}


/**
 * Processes a single message event
 * @param  message_event  a valid Twitter DM message_event
 */
function process_message_event(message_event) {

  console.log('Message recieved from:', message_event.message_create.sender_id)
  console.log(message_event.message_create.message_data)

  var metadata

  // check for quick reply response
  if(message_event.message_create.message_data.quick_reply_response) {
    metadata = message_event.message_create.message_data.quick_reply_response.metadata
    var message_to_send = messages.get(metadata)
    if(message_to_send) {

      return;
    }
  }
  // user submitted free form messsage
  else {

  }
}


/**
 * sends Direct Message with Twitter API
 * @param  msg  a valid message event to sent using POST direct_messages/events/new
 */
mp.send_message = function (msg) {
  console.log('sending message:', msg)
}


module.exports = mp