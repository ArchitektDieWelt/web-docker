const logEvents = import.meta.env.VITE_APP_LOG_EVENTS || false;

export class Logger {
  constructor(private readonly name: string) {}
  log(...args: unknown[]) {
    logEvents && console.log(`[web docker: ${this.name}]: `, ...args);
  }
  warn(...args: unknown[]) {
    logEvents && console.warn(`[web docker: ${this.name}]: `, ...args);
  }
}
