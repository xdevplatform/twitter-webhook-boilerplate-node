module.exports = {
  metadata_trigger: 'feature_buttons',
  message_event: {
    "event": {
      "type": "message_create",
      "message_create": {
        "target": {
          "recipient_id": undefined
        },
        "message_data": {
          "text": "You can see buttons attached to this message! Some customer experiences require actions outside of Direct Messages. Create interactions that open webviews, Tweet compose windows and other external links. \n\nNotice that you can combine Buttons with a Quick Reply. Select another feature when you are ready.",
          "quick_reply": require('./fragment_demo_features_options'),
          "ctas": [
            {
              "type": "web_url",
              "label": "Follow @TwitterDev",
              "url": "https://twitter.com/intent/follow?screen_name=twitterdev"
            },
            {
              "type": "web_url",
              "label": "Visit dev.twitter.com",
              "url": "https://dev.twitter.com"
            },
            {
              "type": "web_url",
              "label": "Learn more about Buttons",
              "url": "https://dev.twitter.com/rest/direct-messages/buttons"
            }
          ]
        }
      }
    }
  }
}