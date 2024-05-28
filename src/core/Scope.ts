export default class Scope {
  constructor(private readonly scope: string) {
    window[this.scope] = {};
  }
}
