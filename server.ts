import { app } from './app/app'
import dotenv from 'dotenv';
import debug from 'debug';
import { AppDataSource } from './app/data-source'

dotenv.config();
const debugServer = debug('express:server');
const debugDatabase = debug('express:db');
const port = (process.env.NODE_PORT || 3000);

app.listen(port, () => {
  debugServer(`Listening on port: ${port}`);
})
app.on('error', onError);

AppDataSource.initialize()
  .then(() => {
    debugDatabase(`Database connected successfully`);
  })
  .catch((err) => {
    debugDatabase("Database connection error: ", err);
  });

function onError(error:any) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}
