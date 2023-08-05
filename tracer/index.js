const tracer = require('tracer')

const standard = ({level = 'info'} = {}) => tracer.colorConsole({
  format: [
    '{{message}} (in {{file}}:{{line}})',
  ],
  level,
})

const defaultDateFormat = 'yy/mm/dd, HH:MM:ss'

const local = ({level = 'info'} = {}) => tracer.colorConsole({
  // format: [
  //   '{{timestamp}} {{message}} (in {{file}}:{{line}})',
  // ],
  format: [
    '{{timestamp}} | {{file}}:{{line}} | {{message}}',
  ],
  level,
  // dateformat: 'HH:MM:ss',
  dateformat: defaultDateFormat,
  transport: [
    data => { process.stdout.write(`${data.output}\n`) },
  ],
})

module.exports = {
  standard,
  local,
}
