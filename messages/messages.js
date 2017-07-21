var message_events = []
var messages = {}

// the default message is none is found
var default_message = {
  "event": {
    "type": "message_create",
    "message_create": {
      "target": {
        "recipient_id": undefined
      },
      "message_data": {
        "text": "Sorry, I don't understand.",
      }
    }
  }
}

// all message files
var message_files = [
  'feature_quick_reply_input',
  'feature_quick_reply_options'
]


/**
 * Adds a message
 * @param  msg  the message json object with metadata_trigger and message_event properties
 */
messages.add = function (msg) {
  message_events[msg.metadata_trigger] = msg.message_event
}


/**
 * Retrieves a message and sets the recipient_id
 * @param  metadata_trigger  the metadata string attached to a message the will trigger the message
 * @param  recipient_id  the user ID the message will be sent to
 * @return json
 */
messages.get = function (metadata_trigger, recipient_id) {
  var msg = default_message

  if (message_events[metadata_trigger]) {
    msg = message_events[metadata_trigger]
  }

  msg.event.message_create.target.recipient_id = recipient_id

  return msg
}


/**
 *  Add all message files
 */
message_files.forEach(function(file_name) {
  messages.add(require('./' + file_name + '.js'))
});


module.exports = messages