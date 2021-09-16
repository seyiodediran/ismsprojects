import * as winston from 'winston';

export const logger = winston.createLogger({
  level: 'info',

  format: winston.format.json(),

  defaultMeta: {
    service: 'ugum-saas',
  },

  // How do i log it
  transports: [
    // log to a file
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});
