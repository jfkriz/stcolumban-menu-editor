import { MenuItem } from './menuItem';
import { MenuDate } from './menuDate';

export class MenuData {
  public entrees: Array<MenuItem>;
  public veggies: Array<MenuItem>;
  public treats: Array<MenuItem>;
  public dates: Map<Date, MenuDate>;

  constructor(json: any = null) {
    if (json) {
      const obj = typeof(json) === 'string' ? JSON.parse(json) : json;
      this.entrees = obj.entrees.map(i => new MenuItem(i));
      this.veggies = obj.veggies.map(i => new MenuItem(i));
      this.treats = obj.treats.map(i => new MenuItem(i));
      this.dates = new Map<Date, MenuDate>();
      Object.keys(obj.dates).forEach(key => this.dates[key] = new MenuDate(obj.dates[key]));
    }
  }
}
