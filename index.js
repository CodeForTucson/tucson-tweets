#!/usr/bin/env node

var async = require('async')
  , program = require('commander')
  , request = require('request')
  , Twitter = require('twitter')
;

program
  .version('0.0.1-dev')
  .command('configure')
  .description('configure Twitter API authorization credentials')
  .option("c, --consumer_key", "Twitter API 'consumer_key'")
  .option("s, --consumer_secret", "Twitter API 'consumer_secret'")
  .option("a, --access_token_key", "Twitter API 'access_token_key'")
  .option("t, --access_token_secret", "Twitter API 'access_token_secret'")
  .action(function (cmd, options) {
    var json = {
      "consumer_key": options.consumer_key,
      "consumer_secret": options.consumer_secret,
      "access_token_key": options.access_token_key,
      "access_token_secret": options.access_token_secret
    };
  })
;

program.parse(process.argv);

function makeConfig () {

}