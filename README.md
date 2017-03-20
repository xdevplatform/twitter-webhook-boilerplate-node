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

4. Run locally
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
3. Confgirue environment variables
Set up an environment variable for evey propertey on config.json.
See Heroku doucmentations on [Configuration and Config Vars](https://devcenter.heroku.com/articles/config-vars).

4. Deploy to Heroku.
```
git push heroku master
```

## Example Scripts

The example scripts in the [example_scripts](/example_scripts) directory perform the following actions:

* Send Direct Messages
* Create and delete @user subscriptions
* Create Welcome Messages and deeplinks
* Create and delete default Welcome Messages
