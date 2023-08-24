module.exports = ({app}) => {
  process.on('SIGINT', async () => {
    app.log?.debug('SIGINT received: Shutdown server...')
    await app.close()
    app.log?.info('Server shutdown completed. Exiting process now.')
    // eslint-disable-next-line no-process-exit
    return process.exit(0)
  })
}
