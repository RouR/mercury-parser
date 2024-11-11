const express = require('express');
const logger = require('morgan');
const http = require('http');
const debug = require('debug')('mercury-parser-express:server');
// const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');

const app = express();

const MyConst = require('./routes/const');

console.log(
  'will use user-agent',
  MyConst.MyConst.userAgent,
  process.env.UserAgent
);

app.use(logger('dev'));
// app.use(bodyParser.json()) // for parsing application/json
app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development

  if(res.locals === undefined)
    return;

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  // eslint-disable-next-line no-restricted-globals
  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  console.error(`mercury error ${JSON.stringify(error)}`);
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      console.error(`some error`);
      throw error;
  }
}

/**
 * Create HTTP server.
 */

const server = http.createServer(app);
console.log(`will start at http://localhost:${port}`);

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
