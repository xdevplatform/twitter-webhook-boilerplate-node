// welcome message
// quick reply
// location sharring
// custom profiles
// buttons
// media and cards
// feebback cards
// direct message card

module.exports = {
  "type": "options",
  "options": [
    {
      "label": "Quick Reply: Options",
      "description": "Prompt a user to select from list of predefined options.",
      "metadata": "feature_quick_reply_options"
    },
    {
      "label": "Quick Reply: Text Input",
      "description": "Prompt a user with hint text and a restricted keyboard.",
      "metadata": "feature_quick_reply_text_input"
    },
    {
      "label": "Location Sharring",
      "description": "Prompt a user to share their location with an interactive map.",
      "metadata": "feature_location_sharring"
    },
    {
      "label": "Custom Profiles",
      "description": "Send a message to a user with an alternate identity.",
      "metadata": "feature_custom_profiles"
    },
    {
      "label": "Buttons",
      "description": "Prompt a user with buttons linked to URLs.",
      "metadata": "feature_buttons"
    },
    {
      "label": "Rich Media",
      "description": "Attach images, videos, GIFs, etc.",
      "metadata": "feature_rich_media"
    },
    {
      "label": "Feedback Card",
      "description": "Prompt a user with an NPS or CSAT survey.",
      "metadata": "feature_feedback_card"
    }
  ]
}