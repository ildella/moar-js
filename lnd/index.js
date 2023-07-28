const {deprecate} = require('util')

module.exports = {
  lndClients: require('./lnd-clients'),
  lndStreams: deprecate(require('./lnd-streams'), 'Please use /fusto/streams instead'),
  lndPolarConfig: require('./lnd-polar-config'),
  lndEnvConfig: require('./lnd-env-config'),
}
