/**
 * Module used to handle the app configuration constants
 */

'use strict';

const config = require('config');

// Webserver parameter
const PORT = (process.env.PORT) ?
  (process.env.PORT) :
  config.get('port');
if (!PORT) { throw new Error('missing PORT') }

// Wit.ai parameters
const WIT_TOKEN = (process.env.WIT_TOKEN) ?
  (process.env.WIT_TOKEN) :
  config.get('witToken');
if (!WIT_TOKEN) { throw new Error('missing WIT_TOKEN') }

// Messenger API parameters
const FB_PAGE_TOKEN = (process.env.MESSENGER_PAGE_ACCESS_TOKEN) ?
  (process.env.MESSENGER_PAGE_ACCESS_TOKEN) :
  config.get('pageAccessToken');
if (!FB_PAGE_TOKEN) { throw new Error('missing FB_PAGE_TOKEN') }

const FB_APP_SECRET = (process.env.MESSENGER_APP_SECRET) ?
  process.env.MESSENGER_APP_SECRET :
  config.get('appSecret');
if (!FB_APP_SECRET) { throw new Error('missing FB_APP_SECRET') }

const FB_VERIFY_TOKEN = config.get('fbValidationToken');


module.exports = {
  WIT_TOKEN: WIT_TOKEN,
  FB_PAGE_TOKEN: FB_PAGE_TOKEN,
  FB_APP_SECRET: FB_APP_SECRET,
  FB_VERIFY_TOKEN: FB_VERIFY_TOKEN,
  PORT: PORT
};