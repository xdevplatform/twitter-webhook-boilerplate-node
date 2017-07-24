# Messages
This simple bot maps metadata values from Quick Reply responses to messages the bot should respond with. If the bot cannot find a response for a provided metadata value or metadata is not provided, the bot will respond with a default message.

## Configuring

Messages are configured in `config.js`. In this file you can set the default message (for when the bots cannot find a response) as well as define all of the message responses for the bot.

### Setting the Default Message

When the bot cannot find a response for a message, it will respond with the message defined for `default_message`. This vaule shoud be a JSON representation of a [Direcet Message Event Object](https://dev.twitter.com/rest/direct-messages/direct-message-event).

### Adding a Response

1. Create a message module with the following strcuture in the `messages` folder. You may want to name the module file the same as the `metadata_trigger` property.
  
  **Module Definition**

  ~~~~
  module.exports = {
    metadata_trigger: 'option_1',
    message_event: {
      "event": {
        "type": "message_create",
        "message_create": {
          "target": {
           "recipient_id": undefined
          },
         "message_data": {
          "text": "You selected option #1!"
        }
       }
      }
    }
  }
  ~~~~
  
  **Module Properties**

  | Property          | Description       |
  |:------------------|:------------------|
  | metadata_trigger  | The metadata value on an incomming message that will trigger the message. |
  | message_event     | A JSON representation of a [Direcet Message Event Object](https://dev.twitter.com/rest/direct-messages/direct-message-event). Set the `recipient_id` to `undefined`. |
	
2. Add the module to `config.js` in the `messages_files` array. Exclude the `.js` extension.

3. Chain this response to an existing message prompt by setting the metadata in a [Quick Reply](https://dev.twitter.com/rest/direct-messages/quick-replies) prompt, [Welcome Message](https://dev.twitter.com/rest/direct-messages/welcome-messages), etc.
