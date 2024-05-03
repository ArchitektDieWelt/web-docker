export class Logger {
  constructor(private readonly name: string, private readonly logEvents: boolean) {}
  log(...args: unknown[]) {
    this.logEvents && console.log(`[web docker: ${this.name}]: `, ...args);
  }
  warn(...args: unknown[]) {
    this.logEvents && console.warn(`[web docker: ${this.name}]: `, ...args);
  }
}
