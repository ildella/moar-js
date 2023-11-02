module.exports = instance => {
  instance.interceptors.response.use(
    response => response,
    error => ({
      ok: false,
      status: error.status,
      data: error,
    })
  )
  return instance
}
