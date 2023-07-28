const isValidUTF8 = string => {
  try {
    Buffer.from(string, 'utf8')
    return true
  } catch (error) {
    return false
  }
}

const isValidBase64 = string => {
  try {
    const decoded = Buffer.from(string, 'base64').toString('base64')
    return string === decoded
  } catch (error) {
    return false
  }
}

const isValidHex = string => {
  const hexPattern = /^[0-9a-fA-F]+$/
  return hexPattern.test(string)
}

module.exports = {
  isValidHex,
  isValidUTF8,
  isValidBase64,
}
