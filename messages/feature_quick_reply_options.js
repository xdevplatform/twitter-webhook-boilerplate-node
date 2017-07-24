module.exports = {
  metadata_trigger: 'feature_quick_reply_options',
  message_event: {
    "event": {
      "type": "message_create",
      "message_create": {
        "target": {
          "recipient_id": undefined
        },
        "message_data": {
          "text": "You can see an example of quick replies (options list) below! Quick replies let businesses prompt people with the best ways to reply to a Direct Message, whether by choosing from a list of options or guiding users to enter specific text values. On mobile quick replies will replace the keyboard, and on desktop they display below the text field.",
          "quick_reply": {
            "type": "options",
            "options": [
              {
                "label": "Option 1",
                "description": "A short description for option 1",
                "metadata": "feature_quick_reply_options_response"
              },
              {
                "label": "Option 2",
                "description": "A short description for option 2",
                "metadata": "feature_quick_reply_options_response"
              },
              {
                "label": "Option 3",
                "description": "A short description for option 3",
                "metadata": "feature_quick_reply_options_response"
              }
            ]
          }
        }
      }
    }
  }
}