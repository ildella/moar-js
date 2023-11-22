const {
  testServer, fastifyApp, httpErrorHandler, tracerFastifyLogger,
} = require('../../http')

const routes = require('./routes')

const app = routes(fastifyApp())
const testFastifyServer = testServer()
const {start, stop, client} = testFastifyServer(app)
tracerFastifyLogger({app, logLevel: 'debug'})
app.setErrorHandler(httpErrorHandler())

global.t = {client, jsonClient: client}

beforeAll(start)
afterAll(stop)
