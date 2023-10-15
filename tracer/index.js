const tracer = require('tracer')

const {toMap} = require('../core')

const standard = ({level = 'info'} = {}) => tracer.colorConsole({
  format: [
    '{{message}} (in {{file}}:{{line}})',
  ],
  level,
})

const defaultDateFormat = 'yy/mm/dd, HH:MM:ss'
const formats = toMap({
  file: [
    '{{timestamp}} | {{file}}:{{line}} | {{message}}',
  ],
  folder: [
    '{{timestamp}} | {{folder}}/{{file}}:{{line}} | {{message}}',
  ],
})

const local = ({level = 'info', format = 'file'} = {}) => tracer.colorConsole({
  level,
  format: formats.get(format),
  dateformat: defaultDateFormat,
  transport: [
    data => {
      process.stdout.write(`${data.output}\n`)
    },
  ],
})

module.exports = {
  standard,
  local,
}
