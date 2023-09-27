const isValidUTF8 = string => {
  try {
    Buffer.from(string, 'utf8')
    return true
  } catch {
    return false
  }
}

const isValidBase64 = string => {
  try {
    const decoded = Buffer.from(string, 'base64').toString('base64')
    return string === decoded
  } catch {
    return false
  }
}

const isValidHex = string => {
  const hexPattern = /^[\dA-Fa-f]+$/
  return hexPattern.test(string)
}

module.exports = {
  isValidHex,
  isValidUTF8,
  isValidBase64,
}
