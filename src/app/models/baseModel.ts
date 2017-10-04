export abstract class BaseModel {
  public toJSON(): any {
    const obj = {};
    const keys = this.getJSONKeys().filter(s => s !== 'toJSON').forEach(key => {
      obj[key] = this[key];
    });
    const json = JSON.stringify(obj);
    return JSON.parse(json);
  }

  getJSONKeys(): string[] {
    return Object.keys(this);
    // Object.keys(this.constructor.prototype)
  }
}
