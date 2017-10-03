export class MenuItem {
  public id: string;
  public originalId: string;
  public type: string;
  public description: string;
  public originalDescription: string;
  public editing: boolean;

  constructor(json: any = null) {
    if (json) {
      const obj = typeof(json) === 'string' ? JSON.parse(json) : json;
      Object.assign(this, obj);
    }
  }

  get text(): string {
    return this.description;
  }

  set text(text: string) {
    this.description = text;
  }
}
