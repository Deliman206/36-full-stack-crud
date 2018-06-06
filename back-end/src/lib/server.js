'use strict';

import express from 'express';
import mongoose from 'mongoose';
// import cors from 'cors';
import logger from './logger';
import libraryRoutes from '../route/library-router';
import errorMiddleWare from './error-middleware';
import bookRoutes from '../route/book-router';
import authRoutes from '../route/auth-router';
import loggerMiddleware from './logger-middleware';

const app = express();
let server = null;

// app.use(cors());
app.use(loggerMiddleware);
app.use(authRoutes);
app.use(libraryRoutes);
app.use(bookRoutes);

app.all('*', (request, response) => {
  logger.log(logger.INFO, 'SERVER: Returning a 404 from the catch-all/default route');
  return response.sendStatus(404);
});

app.use(errorMiddleWare);

const startServer = () => {
  return mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      server = app.listen(process.env.PORT, () => {
        logger.log(logger.INFO, `Server is listening on port ${process.env.PORT}`);
      });
    })
    .catch((err) => {
      logger.log(logger.ERROR, `something happened, ${JSON.stringify(err)}`);
    });
};

const stopServer = () => {
  return mongoose.disconnect()
    .then(() => {
      server.close(() => {
        logger.log(logger.INFO, 'Server is off');
      });
    })
    .catch((err) => {
      logger.log(logger.ERROR, `something happened, ${JSON.stringify(err)}`);
    });
};

export { startServer, stopServer };

