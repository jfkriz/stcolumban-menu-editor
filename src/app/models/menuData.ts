import { MenuItem } from './menuItem';
import { MenuDate } from './menuDate';
import * as moment from 'moment';

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

  public addNewEntree(): MenuItem {
    return this.addNewItem(this.entrees, 'entree', 'newEntree', 'New Entree');
  }

  public addNewVeggie(): MenuItem {
    return this.addNewItem(this.veggies, 'veggie', 'newVeggie', 'New Veggie');
  }

  public addNewTreat(): MenuItem {
    return this.addNewItem(this.treats, 'treat', 'newTreat', 'New Treat');
  }

  private addNewItem(items: Array<MenuItem>, itemType: string, keyTemplate: string, descriptionTemplate: string) {
    const add = new MenuItem();
    add.type = itemType;

    let i = 1;
    do {
      const key = `${keyTemplate}${i}`;
      if (items.find(item => item.id === key) === undefined) {
        add.id = key;
        add.description = `${descriptionTemplate} ${i}`;
      }
      i++;
    } while (add.id === undefined);

    items.push.apply(items, [add]);
    return add;
  }

  public addNewMenuDate(date: Date): MenuDate {
    const menuDate = new MenuDate();

    const key = moment(date).format('M/D/YYYY');
    this.dates[key] = menuDate;
    return menuDate;
  }

  public getDates(): [Date, MenuDate][] {
    return Array.from(this.dates);
  }
}
