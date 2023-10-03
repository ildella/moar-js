const {getSignature, getEventHash, getPublicKey} = require('nostr-tools')

const {curry} = require('../core')

const signEvent = (secretKey, event) => {
  const sig = getSignature(event, secretKey)
  const id = getEventHash(event)
  return {...event, id, sig}
}

/* eslint-disable camelcase */
const newEvent = (secretKey, {content}) => ({
  kind: 1,
  created_at: Math.floor(Date.now() / 1000),
  content,
  tags: [],
  pubkey: getPublicKey(secretKey),
})

module.exports = secretKey => ({
  signEvent: curry(signEvent)(secretKey),
  newEvent: curry(newEvent)(secretKey),
})
