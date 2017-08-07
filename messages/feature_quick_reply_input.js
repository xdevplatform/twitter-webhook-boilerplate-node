module.exports = {
  metadata_trigger: 'feature_quick_reply_input',
  message_event: {
    "event": {
      "type": "message_create",
      "message_create": {
        "target": {
          "recipient_id": undefined
        },
        "message_data": {
          "text": "Normally the text field shows “Send a message” but with the text input version of quick replies you can modify this to give better instructions for what people should enter (ie Email address or Zip code). Enter anything to proceed.",
          "quick_reply": {
            "type": "text_input",
            "text_input": {
              "keyboard": "number",
              "label": "Enter any number you want.",
              "metadata": "feature_quick_reply_input_response"
            }
          }
        }
      }
    }
  }
}