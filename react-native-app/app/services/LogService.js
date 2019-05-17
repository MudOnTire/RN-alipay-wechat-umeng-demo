const LogLevels = {
  trace: 0,
  debug: 1,
  info: 2,
  warn: 3,
  error: 4,
  none: 5,
};

/**
 * 日志服务
 */
export default class LogService {

  static logLevel = 'info';

  /**
   *
   * @param data
   */
  static trace(...data) {
    if (LogLevels[LogService.logLevel] <= LogLevels.trace) {
      console.trace(...data);
    }
  }

  /**
   * debug日志
   * @param data
   */
  static debug(...data) {
    if (LogLevels[LogService.logLevel] <= LogLevels.debug) {
      console.log(...data);
    }
  }

  static info(...data) {
    if (LogLevels[LogService.logLevel] <= LogLevels.info) {
      console.info(...data);
    }
  }

  static warn(...data) {
    if (LogLevels[LogService.logLevel] <= LogLevels.warn) {
      console.warn(...data);
    }
  }

  static error(...data) {
    if (LogLevels[LogService.logLevel] <= LogLevels.error) {
      console.error(...data);
    }
  }
}
