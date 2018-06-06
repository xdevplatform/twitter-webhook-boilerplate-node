# Twitter Webhook Boilerplate Node

Starter web app for consuming events via Account Activity API (beta).

**Note:** This application is only compatible with the DM-only beta version of the Account Activity API. The DM-only beta will end on August 16, 2018 and this app will no longer be fully funcional. Please see [this project](https://github.com/twitterdev/account-activity-dashboard) for updated example code to get started with the Account Activity API.

## Dependencies

* A Twitter app created on [apps.twitter.com](https://apps.twitter.com/)
* [Node.js](https://nodejs.org)
* [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) (optional)

## Create and configure a Twitter app

1. Create a Twitter app on [apps.twitter.com](https://apps.twitter.com/)

2. On the **Permissions** tab > **Access** section > enable **Read, Write and Access direct messages**.

3. On the **Keys and Access Tokens** tab > **Your Access Token** section > click **Create my access token** button.

4.  On the **Keys and Access Tokens** tab, take note of the `consumer key`, `consumer secret`, `access token` and `access token secret`.

## Setup & run the Node.js web app

1. Clone this repository:

	```
	git clone https://github.com/twitterdev/twitter-webhook-boilerplate-node.git
	```

2. Install Node.js dependencies:

	```
	npm install
	```

3. Create a new `config.json` file based on `config.sample.json` and fill in your Twitter keys and tokens.

4. Run locally:

	```
	node index
	```
	
5. Deploy app. To deploy to Heroku see "Deploy to Heroku" instructions below.
	
	Take note of your webhook URL. For example: 
	```
	https://your.app.domain/webhooks/twitter
	```
	
## Configure webhook to receive events via the API

1. Create webhook config. Update `WEBHOOK_URL` in source code.

	```
	node example_scripts/webhook_management/create-webhook-config.js 
	```
	Take note of returned `webhook_id`.

2. Add user subscription. Update `WEBHOOK_ID` in source code.

	```
	node example_scripts/webhook_management/add-subscription.js 
	```
	Subscription will be created for user the context provided by the access tokens.

3. Test configuration by sending a DM to or from the subscribed account. You should receive a message event on your deployed webhook app.

## Example Scripts

See the example scripts in the `example_scripts` directory to:

* Send Direct Messages.
* Manage webhook configs and subscriptions.
* Setup Welcome Message deeplinks and defaults.

## Deploy to Heroku (optional)

1. Init Heroku app.

	```
	heroku create
	``` 

2. Run locally.

	```
	heroku local
	```
	
3. Configure environment variables. Set up an environment variable for every property on config.json. See Heroku documentation on [Configuration and Config Vars](https://devcenter.heroku.com/articles/config-vars).

4. Deploy to Heroku.

	```
	git push heroku master
	```

**Note:** The free tier of Heroku will put your app to sleep after 30 minutes. On cold start, you app will have very high latency which may result in a CRC failure that deactivates your webhook. To trigger a CRC request and re-validate, run the following script with your `WEBHOOK_ID`:

```
node example_scripts/webhook_management/trigger-crc-request.js
```


## Documentation
* [Direct Message API](https://developer.twitter.com/en/docs/direct-messages/api-features)
* [Account Activity API (webhook)](https://developer.twitter.com/en/docs/accounts-and-users/subscribe-account-activity/overview)
