module.exports = {
  metadata_trigger: 'feature_location_sharing',
  message_event: {
    "event": {
      "type": "message_create",
      "message_create": {
        "target": {
          "recipient_id": undefined
        },
        "message_data": {
          "text": "You can see a request to share your location attached to this message! Location sharing allows business to get essential context for delivering many customer experiences -- examples include an automated location finder bot, helping a human agent interpret complaints about mobile phone service, or personalizing news content.",
          "quick_reply": {
            "type": "location",
            "location": {
              "metadata": "feature_location_sharing_response"
            }
          }
        }
      }
    }
  }
}