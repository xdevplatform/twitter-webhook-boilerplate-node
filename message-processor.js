var _ = require('lodash');
var twitter = require('./twitter')
var messages = require('./messages')

var mp = {}


/**
 * Processes incomming events
 * @param  payload  the incomming webhook json payload
 */
mp.process = function (payload) {

  // check for direct message events
  if(payload.direct_message_events) {

    // loop through each event
    _.forEach(payload.direct_message_events, function(message_event) {

      // check if event is a message_create event and if it is incomming by validating sender ID
      if(message_event.type == 'message_create' && message_event.message_create.sender_id !== twitter.user_id) {
        
        // process each event individually
        process_message_event(message_event)
      }
    });
  }
}


/**
 * Processes a single message event
 * @param  message_event  a valid Twitter DM message_event
 */
function process_message_event (message_event) {

  console.log('Message recieved from:', message_event.message_create.sender_id)
  console.log(message_event.message_create.message_data)

  var metadata
  var message_to_send
  var sender_id

  // check for quick reply response
  if(message_event.message_create.message_data.quick_reply_response) {

    // access the metadata of the quick reply response
    metadata = message_event.message_create.message_data.quick_reply_response.metadata
  }
  // user submitted free form messsage
  else {
    var message_text = message_event.message_create.message_data.text
    metadata = 'default_message' 
  }


  // access sender of the message to reply to
  sender_id = message_event.message_create.sender_id

  // retrieve response for provided metadata
  message_to_send = messages.get(metadata, sender_id)

  mp.send_message(message_to_send)
}


/**
 * sends Direct Message with Twitter API
 * @param  msg  a valid message event to sent using POST direct_messages/events/new
 */
mp.send_message = function (msg) {
  twitter.send_direct_message(msg, function (error, response, body) {
    console.log(body)
  })
}


module.exports = mp