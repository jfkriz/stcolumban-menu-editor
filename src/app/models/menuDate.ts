import { MenuItem } from './menuItem';

export class MenuDate {
  constructor(json: any = null) {
    if (json) {
      const obj = typeof(json) === 'string' ? JSON.parse(json) : json;
      Object.assign(this, obj);
    } else {
      this._entrees = [];
      this._veggie = new MenuItem();
      this._treat = new MenuItem();
    }
  }

  get entree(): string {
    return this.entrees.join(';');
  }
  set entree(entree: string) {
    this.entrees = entree.split(';');
  }

  private _entrees: MenuItem[];
  get entrees(): string [] {
    return this._entrees.map(i => i.id);
  }
  get entreesObj(): MenuItem[] {
    return this._entrees;
  }
  set entrees(entrees: string []) {
    this._entrees = entrees.map(i => new MenuItem({id: i}));
  }
  set entreesObj(entrees: MenuItem[]) {
    this._entrees = entrees;
  }

  private _veggie: MenuItem = new MenuItem();
  get veggie(): string {
    return this._veggie.id;
  }
  get veggieObj(): MenuItem {
    return this._veggie;
  }
  set veggie(veggie: string) {
    this._veggie.id = veggie;
  }
  set veggieObj(veggie: MenuItem) {
    this._veggie = veggie;
  }

  public _treat: MenuItem = new MenuItem();
  get treat(): string {
    return this._treat.id;
  }
  get treatObj(): MenuItem {
    return this._treat;
  }
  set treat(treat: string) {
    this._treat.id = treat;
  }
  set treatObj(treat: MenuItem) {
    this._treat = treat;
  }

  public originalDate: Date;
  public originalEntrees: string[];
  public originalVeggie: string;
  public originalTreat: string;
  public editing: boolean;
  public allowEditDate: boolean;
}
