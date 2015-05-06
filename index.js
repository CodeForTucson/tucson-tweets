#!/usr/bin/env node

var async = require('async')
  , program = require('commander')
  , fs = require('fs')
  , request = require('request')
  , Twitter = require('twitter')
;

program
  .version('0.0.1-dev')
  .command('configure')
  .description('configure Twitter API authorization credentials')
  .option("-c, --consumer_key [value]", "Twitter API 'consumer_key'")
  .option("-s, --consumer_secret [value]", "Twitter API 'consumer_secret'")
  .option("-a, --access_token_key [value]", "Twitter API 'access_token_key'")
  .option("-t, --access_token_secret [value]", "Twitter API 'access_token_secret'")
  .action(function (options) {
    var data = {
      "consumer_key": options.consumer_key,
      "consumer_secret": options.consumer_secret,
      "access_token_key": options.access_token_key,
      "access_token_secret": options.access_token_secret
    };
    fs.exists('./config.json', function (exists) {
      if (exists) fs.unlinkSync('./config.json');
      fs.writeFile('./config.json', JSON.stringify(data), function (error) {
        if (error) console.log(error);
      });
    })
  })
;

program.parse(process.argv);