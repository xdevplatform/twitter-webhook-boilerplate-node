module.exports = {
  metadata_trigger: 'feature_quick_reply_input_response',
  message_event: {
    "event": {
      "type": "message_create",
      "message_create": {
        "target": {
          "recipient_id": undefined
        },
        "message_data": {
          "text": "Select another feature or learn more about Quick Reply Text Input.",
          "quick_reply": require('./fragment_demo_features_options'),
          "ctas": [
            {
              "type": "web_url",
              "label": "Learn more about Text Input",
              "url": "https://dev.twitter.com/rest/direct-messages/quick-replies/text-input"
            }
          ]
        }
      }
    }
  }
}