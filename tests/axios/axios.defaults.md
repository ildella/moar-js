```js
{
        transitional: {
          silentJSONParsing: true,
          forcedJSONParsing: true,
          clarifyTimeoutError: true
        },
        adapter: [ 'xhr', 'http' ],
        transformRequest: [ [Function: transformRequest] ],
        transformResponse: [ [Function: transformResponse] ],
        timeout: 2500,
        xsrfCookieName: 'XSRF-TOKEN',
        xsrfHeaderName: 'X-XSRF-TOKEN',
        maxContentLength: -1,
        maxBodyLength: -1,
        env: {
          FormData: [Function: FormData] {
            LINE_BREAK: '\r\n',
            DEFAULT_CONTENT_TYPE: 'application/octet-stream'
          },
          Blob: [class Blob]
        },
        validateStatus: [Function: validateStatus],
        headers: {
          common: { Accept: 'application/json, text/plain, */*' },
          delete: {},
          get: {},
          head: {},
          post: { 'Content-Type': undefined },
          put: { 'Content-Type': undefined },
          patch: { 'Content-Type': undefined },
          Accept: 'application/json',
          'Accept-Encoding': 'gzip, deflate',
          'Content-Type': 'application/json; charset=utf-8'
        },
        baseURL: 'https://0.0.0.0:443',
        httpAgent: Agent {
          _events: [Object: null prototype] {
            free: [Function (anonymous)],
            newListener: [Function: maybeEnableKeylog]
          },
          _eventsCount: 2,
          _maxListeners: undefined,
          defaultPort: 80,
          protocol: 'http:',
          options: [Object: null prototype] {
            keepAlive: true,
            noDelay: true,
            path: null
          },
          requests: [Object: null prototype] {},
          sockets: [Object: null prototype] {},
          freeSockets: [Object: null prototype] {},
          keepAliveMsecs: 1000,
          keepAlive: true,
          maxSockets: Infinity,
          maxFreeSockets: 256,
          scheduling: 'lifo',
          maxTotalSockets: Infinity,
          totalSocketCount: 0,
          [Symbol(kCapture)]: false
        },
        httpsAgent: Agent {
          _events: [Object: null prototype] {
            free: [Function (anonymous)],
            newListener: [Function: maybeEnableKeylog]
          },
          _eventsCount: 2,
          _maxListeners: undefined,
          defaultPort: 443,
          protocol: 'https:',
          options: [Object: null prototype] {
            keepAlive: true,
            rejectUnauthorized: true,
            noDelay: true,
            path: null
          },
          requests: [Object: null prototype] {},
          sockets: [Object: null prototype] {},
          freeSockets: [Object: null prototype] {},
          keepAliveMsecs: 1000,
          keepAlive: true,
          maxSockets: Infinity,
          maxFreeSockets: 256,
          scheduling: 'lifo',
          maxTotalSockets: Infinity,
          totalSocketCount: 0,
          maxCachedSessions: 100,
          _sessionCache: { map: {}, list: [] },
          [Symbol(kCapture)]: false
        },
        insecureHTTPParser: false
      }

```
