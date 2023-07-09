const {EOL} = require('os')
const {readFile, writeFile, mkdir} = require('fs/promises')

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

const writeJson = async (path, json) => {
  await writeFile(
    path,
    `${JSON.stringify(json)}${EOL}`,
  )
  return json
}

const ignoreErrorWhenFolderExists = error => {
  if (error.code !== 'EEXIST') {
    console.error(error.code, error)
  }
  console.log('Folder exists, moving on...')
}

const mkFolder = folderName => mkdir(
  folderName, {recursive: true}, ignoreErrorWhenFolderExists,
)

module.exports = {
  readJson,
  writeJson,
  mkFolder,
  readText,
  writeText,
}
