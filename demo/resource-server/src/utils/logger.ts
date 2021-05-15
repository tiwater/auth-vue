import * as winston from 'winston';

export class Logger {
  public static createLogger(name: string) {
    let debugLvl = 'info';
    if (process.env.NODE_ENV !== 'prod') {
      debugLvl = 'debug';
    }
    const logger = winston.createLogger({
      level: debugLvl,
      defaultMeta: { class: name },
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json(),
      ),
    });

    //
    // - Write all logs with level `error` and below to `error.log`
    //
    // logger.add(new winston.transports.File({ filename: 'error' + name + '.log', level: 'error' }));
    // logger.add(new winston.transports.File({ filename: 'combined' + name + '.log' }));
    logger.add(
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
    );
    //
    // If we're not in production then log to the `console` with the format:
    // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
    //
    if (process.env.NODE_ENV !== 'prod') {
      logger.add(
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
          ),
        }),
      );
    }
    return logger;
  }
}
