const fastify = require('fastify')

const {testServer} = require('../../http')
const routes = require('./routes')

const app = routes(fastify())
const testFastifyServer = testServer()
const {start, stop, client} = testFastifyServer(app)

global.t = {client}

beforeAll(start)
afterAll(stop)
