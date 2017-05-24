# Twitter Webhook Boilerplate Node

Starter web app for consuming events via Account Activity API.


## Dependencies

* [Node.js](https://nodejs.org)
* [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) (optional)



## Setup & running the app

1. Clone this repository:

	```
	git clone https://github.com/twitterdev/twitter-webhook-boilerplate-node.git
	```

2. Install Node.js dependencies:

	```
	npm install
	```

3. Create a `config.json` based on `config.sample.json` and fill in the Twitter keys and tokens.

4. Create webhook config. Update `WEBHOOK_URL` in source code.

	```
	node example_scripts/webhook_management/create-webhook-config.js 
	```
	Take node of returned `webhook_id`.

5. Add user subscription. Update `WEBHOOK_ID` in source code.

	```
	node example_scripts/webhook_management/add-subscription.js 
	```
	Subscription will be created for user the context provided by the access tokens.

6. Run locally

	```
	node index
	```


## Deploy to Heroku (optional)

1. Init Heroku app.

	```
	heroku create
	``` 

2. Run locally.

	```
	heroku local
	```
	
3. Confgirue environment variables. Set up an environment variable for evey propertey on config.json. See Heroku doucmentations on [Configuration and Config Vars](https://devcenter.heroku.com/articles/config-vars).

4. Deploy to Heroku.

	```
	git push heroku master
	```

**Note:** The free tier of Heroku will put your app to sleep after 30 minutes. On cold start, you app will have very high latency which may result in a CRC failure that deactivates your webhook. To trigger a CRC request and re-validate run the following script with your `WEBHOOK_ID`:

```
node example_scripts/webhook_management/trigger-crc-request.js
```

## Documentation
* [Direct Message API](https://dev.twitter.com/webhooks)
* [Account Activity API (webhook)](https://dev.twitter.com/rest/direct-messages)
