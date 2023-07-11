const {nil} = require('../fusto')

module.exports = socket => (push, next) => {
  socket.on('message', event => {
    const message = Buffer.from(event).toString()
    // console.log('socket message:', message)
    push(message)
    next()
  })

  socket.on('error', error => {
    console.warn('socket error:', error)
    push(new Error(error.message, {cause: error}))
  })

  socket.addEventListener('close', () => {
    // console.info('socket close:')
    push(null, nil)
  })
}
