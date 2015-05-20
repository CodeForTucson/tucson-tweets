#!/usr/bin/env node

var async = require('async')
  , program = require('commander')
  , fs = require('fs')
  , request = require('request')
  , Twitter = require('twitter')
;

// Return Twitter.js client object
function configure (callback) {
  fs.readFile('./config.json', function (error, data) {
    if (error) callback(error);
    else callback(null, new Twitter(JSON.parse(data)));
  });
}

program
  .version('0.0.1-dev')
  .command('configure')
  .description('configure Twitter API authorization credentials')
  .option("-c, --consumer_key [value]", "Twitter API 'consumer_key'")
  .option("-s, --consumer_secret [value]", "Twitter API 'consumer_secret'")
  .option("-a, --access_token_key [value]", "Twitter API 'access_token_key'")
  .option("-t, --access_token_secret [value]",
    "Twitter API 'access_token_secret'")
  .action(function (options) {

    function hasNull (obj) {
      for (var item in obj) {
        if (typeof obj[item] === 'undefined' || typeof obj[item] === null)
          return true;
      }
      return false;
    };

    var data = {
      "consumer_key": options.consumer_key,
      "consumer_secret": options.consumer_secret,
      "access_token_key": options.access_token_key,
      "access_token_secret": options.access_token_secret
    };

    if (hasNull(data)) return console.log('All options are required!');

    data = JSON.stringify(data);
    fs.exists('./config.json', function (exists) {
      if (exists) fs.unlinkSync('./config.json');
      fs.writeFile('./config.json', data, function (error) {
        if (error) console.log(error);
      });
    });

  })
  .command('geosearch')
  .description('GET recent tweets within Tucson, AZ bounding box')
  .action(function () {
    configure(function (error, client) {
      if (error) return console.log(error);
      client.get('')
    })
  })
;


program.parse(process.argv);