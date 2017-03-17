# Twitter Webhook Boilerplate Node

Starter web app for consuming events via Account Activity API.

## Dependencies

* [Node.js](https://nodejs.org)
* [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)


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

4. Init Heroku app.
```
heroku create
``` 

5. Run locally.
```
heroku local
```

6. Deploy to Heroku.
```
git push heroku master
```
