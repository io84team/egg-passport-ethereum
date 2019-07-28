'use strict';

const debug = require('debug')('egg-passport-ethereum');
const assert = require('assert');
const Strategy = require('passport-ethereum').Strategy;

module.exports = app => {
  const config = app.config.passportEthereum;
  config.passReqToCallback = true;
  assert(config.key, '[egg-passport-ethereum] config.passportEthereum.key required');

  // must require `req` params
  app.passport.use('ethereum', new Strategy(config, (req, address, signature, done) => {
    // format user
    const user = {
      provider: 'ethereum',
      address: address,
      signature: signature,
      expires: req.query.expires,
      csrf: req.query.csrf,
    };

    debug('%s %s get user: %j', req.method, req.url, user);

    // let passport do verify and call verify hook
    app.passport.doVerify(req, user, done);
  }));
};
