const {generatePrivateKey, getPublicKey, verifySignature} = require('nostr-tools')

const {signEvent} = require('../../nostr')

const secretKey = generatePrivateKey()
const publicKey = getPublicKey(secretKey)

const event = {
  kind: 1,
  content: 'Frankie GPT',
  // created_at: Date.now(),
  created_at: Math.floor(Date.now() / 1000),
  pubkey: publicKey,
  tags: [],
}

test('generate and sign content', async () => {
  const signedEvent = await signEvent(event, secretKey)
  expect(signedEvent).toHaveProperty('id')
  expect(signedEvent).toHaveProperty('sig')
  expect(signedEvent).toHaveProperty('content', 'Frankie GPT')
  // expect(signedEvent).toEqual({})
})

test('verify signature', async () => {
  const signedEvent = await signEvent(event, secretKey)
  const verified = await verifySignature(signedEvent)
  expect(verified).toBe(true)
})
