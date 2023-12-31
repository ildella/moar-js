const {EOL} = require('os')
const {readFileSync} = require('fs')
const {readFile, writeFile, mkdir} = require('fs/promises')
const curry = require('just-curry-it')

/*
  eslint-disable security/detect-non-literal-fs-filename
*/

const readText = async (path, options) => {
  const buffer = await readFile(path, options)
  return buffer.toString()
}

const writeText = async (path, text) => {
  await writeFile(
    path,
    `${text}${EOL}`,
  )
  return text
}

const readJson = async (path, options) => {
  const buffer = await readFile(path, options)
  return JSON.parse(buffer.toString())
}

const readJsonSync = (path, options) => {
  const buffer = readFileSync(path, options)
  return JSON.parse(buffer.toString())
}

const writeJson = async (path, json) => {
  await writeFile(
    path,
    `${JSON.stringify(json)}${EOL}`,
  )
  return json
}

const ignoreErrorWhenFolderExists = error => {
  if (error.code !== 'EEXIST') {
    // should throw the error...
    // console.error(error.code, error)
  }
  // console.log('Folder exists, moving on...')
}

const mkFolder = folderName => mkdir(
  folderName, {recursive: true}, ignoreErrorWhenFolderExists,
)

module.exports = {
  readJson,
  readJsonSync,
  writeJson: curry(writeJson),
  mkFolder,
  readText,
  writeText: curry(writeText),
}
