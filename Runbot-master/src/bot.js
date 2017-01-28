/**
 * Wit.ai bot specific code
 */
const configuration = require('./configuration.js');
const sessionManager = require('./sessionManager.js');
const facebook = require('./facebook.js');
const dataParser = require('./dataParser.js');

let Wit = null;
let log = null;
try {
  // if running from repo
  Wit = require('../').Wit;
  log = require('../').log;
} catch (e) {
  Wit = require('node-wit').Wit;
  log = require('node-wit').log;
}

const getWit = () => {
  return new Wit({
  accessToken: configuration.WIT_TOKEN,
  actions,
  logger: new log.Logger(log.INFO)
});
}

// Our bot actions
const actions = {
  send({sessionId}, {text}) {
    // Our bot has something to say!
    // Let's retrieve the Facebook user whose session belongs to
    const recipientId = sessionManager.sessions[sessionId].fbid;
    if (recipientId) {
      // Yay, we found our recipient!
      // Let's forward our bot response to her.
      // We return a promise to let our bot know when we're done sending
      return facebook.sendMessage(recipientId, text)
        .then(() => null)
        .catch((err) => {
          console.error(
            'Oops! An error occurred while forwarding the response to',
            recipientId,
            ':',
            err.stack || err
          );
        });
    } else {
      console.error('Oops! Couldn\'t find user for session:', sessionId);
      // Giving the wheel back to our bot
      return Promise.resolve()
    }
  },

  saveWorkout({context, entities}) {
    return new Promise(function (resolve, reject) {
      // not saving anything yet, this is a first try
      let distanceValue = dataParser.firstEntityValue(entities, 'distance');
      let distanceUnit = dataParser.firstEntityUnit(entities, 'distance');

      let durationValue = dataParser.firstEntityValue(entities, 'duration');
      let durationValueInHours = dataParser.firstNormalizedEntityValue(entities, 'duration') / 3600;
      let durationUnit = dataParser.firstEntityUnit(entities, 'duration');

      context.averageSpeed = `${(distanceValue / durationValueInHours).toFixed(1)} ${distanceUnit}/${durationUnit}`;
      context.pace = `${durationValueInHours / distanceValue} ${durationUnit}/${distanceUnit}`
      return resolve(context);
    });
  }
};

module.exports = {
    getWit: getWit
}