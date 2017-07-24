module.exports = {

  // this message is used if the bot can't find a response
  default_message: {
    "event": {
      "type": "message_create",
      "message_create": {
        "target": {
          "recipient_id": undefined
        },
        "message_data": {
          "text": "Sorry. My knwoledge of natural language is limited. To learn more about a feature, select an option below.",
          "quick_reply": require('./fragment_demo_features_options')
        }
      }
    }
  },

  // all message responses
  messages_files: [
    'feature_quick_reply_input',
    'feature_quick_reply_input_response',
    'feature_quick_reply_options',
    'feature_quick_reply_options_response',
    'feature_buttons',
    'feature_location_sharing',
    'feature_location_sharing_response',
  ]
}