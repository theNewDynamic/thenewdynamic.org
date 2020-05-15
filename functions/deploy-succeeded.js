"use strict";

var atomicalgolia = require("atomic-algolia");
var request = require("request-promise-native");

exports.handler = function (event, context, callback) {
  /*
   * If the function is hit by a cron job and not an event from Netlify (deploy-succeeded), it is recommanded to guard the function
   * from public hits.
   * To do so, simply an ALOGLIA_SCRIPT_KEY env variable. When found, the function will try and match it to a query parameter passed to
   * functions endpoint's url. (.netlify/functions/algolia-update?key=xxxxxx)
   *
   */
  if (
    process.env.ALGOLIA_SCRIPT_KEY &&
    event.queryStringParameters.key != process.env.ALGOLIA_SCRIPT_KEY
  ) {
    const bodyResponse = {
      error: "Forbidden: wrong key",
    };
    callback(null, {
      statusCode: 403,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyResponse),
    });
    return;
  }

  var indexName = process.env.ALGOLIA_INDEX_NAME;
  // TODO: Ideally we'd rather use DEPLOY_URL or else as we are hitting the algolia endpoint
  var indexURL = process.env.ALGOLIA_INDEX_URL;

  request({ url: indexURL, json: true })
    .then(function (data) {
      updateIndex(indexName, data, callback);
    })
    .catch(function (err) {
      callback(err);
    });
};

var updateIndex = (indexName, data, callback) => {
  return atomicalgolia(indexName, data, { verbose: true }, function (err, res) {
    if (err) {
      callback(err);
    } else {
      callback(null, {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(res),
      });
    }
  });
};
