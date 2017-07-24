var config = require('./config')

var message_events = []
var messages = {}


/**
 * Adds a message
 * @param  msg  the message json object with metadata_trigger and message_event properties
 */
messages.add = function (msg) {
  
  if (message_events[msg.metadata_trigger]) {
    throw 'Message already added for trigger: ' +  msg.metadata_trigger
  }

  message_events[msg.metadata_trigger] = msg.message_event
}


/**
 * Retrieves a message and sets the recipient_id
 * @param  metadata_trigger  the metadata string attached to a message the will trigger the message
 * @param  recipient_id  the user ID the message will be sent to
 * @return json
 */
messages.get = function (metadata_trigger, recipient_id) {

  var msg = config.default_message

  if (message_events[metadata_trigger]) {
    msg = message_events[metadata_trigger]
  }

  msg.event.message_create.target.recipient_id = recipient_id

  return msg
}


/**
 *  Add all message files
 */
config.messages_files.forEach(function (file_name) {
  
  messages.add(require('./' + file_name + '.js'))
})


/**
 *  Add default message
 */
messages.add({
  metadata_trigge: 'default_message',
  message_event: config.default_message
})


module.exports = messages