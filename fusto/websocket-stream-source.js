const __ = require('exstream.js')
const {nil} = __

module.exports = socket => (push, next) => {
  socket.on('message', event => {
    const message = Buffer.from(event).toString()
    // console.log('socket message:', message)
    push(message)
    next()
  })

  socket.on('error', error => {
    // console.warn('socket error:', error)
    push(new Error(error.message, {cause: error}))
  })

  socket.on('close', event => {
    console.info('socket close event', event)
    push(null, nil)
  })
}
