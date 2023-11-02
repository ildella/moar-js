const {pipeline} = require('../fusto')

module.exports = ({doneText = '[DONE]'} = {}) =>
  pipeline()
    .split()
    .filter(line => line.trim() !== '')
    .map(line => line.replace(/^data: /, ''))
    .filter(message => message !== doneText)
    .map(JSON.parse)
    .pluck('choices')
    .flatten()
    .filter(({finish_reason: finish}) => finish !== 'stop')
    .pluck('delta')
