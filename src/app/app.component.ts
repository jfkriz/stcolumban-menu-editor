import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxJs';
import { MenuData } from './models/menuData';
import { MenuDate } from './models/menuDate';
import { MenuItem } from './models/menuItem';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AppComponent implements OnInit {
  title = 'app';
  public isDaysCollapsed: boolean;
  public isJsonCollapsed: boolean;
  public menuUrl: string;
  public menuData: MenuData;
  public isReady: boolean;
  public alerts: any = [];
  public _this = this;
  public itemTypes: any = [];

  constructor(private http: HttpClient) {
    this.isDaysCollapsed = false;
    this.isJsonCollapsed = true;
    this.menuUrl = 'https://s3.amazonaws.com/lambda-function-bucket-us-east-1-1486176755721/SaintColumban/menu.json';
    this.isReady = false;
  }

  deleteItem(items: Array<MenuItem>, item: MenuItem) {
    const filtered = items.filter(val => {
      return val.id !== item.id;
    });
    items.length = 0;
    items.push.apply(items, filtered);
  }

  deleteDate(menuDate: MenuDate) {
    const dates = this.menuData.dates;
    const filtered = dates.filter(val => {
      return val.date !== menuDate.date;
    });
    dates.length = 0;
    dates.push.apply(dates, filtered);
  }

  getJsonMenu() {
    return JSON.stringify(this.menuData, null, 2);
  }

  editItem(item: MenuItem) {
    item.originalDescription = item.description;
    item.originalId = item.id;
    item.editing = true;
  }

  confirmEditItem(items: Array<MenuItem>, item: MenuItem) {
    if (item.id !== item.originalId) {
      this.menuData.dates.forEach(date => {
        let i: number;
        if ((i = date.entrees.indexOf(item.originalId)) >= 0) {
          date.entrees[i] = item.id;
        } else if (date.veggie === item.originalId) {
          date.veggie = item.id;
        } else if (date.treat === item.originalId) {
          date.treat = item.id;
        }
      });
    }
    item.originalDescription = undefined;
    item.originalId = undefined;
    item.editing = false;
  }

  cancelEditItem(item: MenuItem) {
    item.description = item.originalDescription;
    item.id = item.originalId;
    item.editing = false;
  }

  editDate(menuDate: MenuDate) {
    const entrees = menuDate.entrees ? this.menuData.entrees.filter(i => menuDate.entrees.indexOf(i.id) >= 0) : undefined;
    if (entrees) {
      menuDate.entreesObj = entrees.map(e => new MenuItem(e));
    }
    const treat = menuDate.treat ? this.menuData.treats.find(i => i.id === menuDate.treatObj.id) : undefined;
    if (treat) {
      menuDate.treatObj = new MenuItem(treat);
    }
    const veggie = menuDate.veggie ? this.menuData.veggies.find(i => i.id === menuDate.veggieObj.id) : undefined;
    if (veggie) {
      menuDate.veggieObj = new MenuItem(veggie);
    }

    menuDate.originalDate = moment(menuDate.dateObj).toDate();
    menuDate.originalEntrees = menuDate.entrees;
    menuDate.originalVeggie = menuDate.veggie;
    menuDate.originalTreat = menuDate.treat;
    menuDate.editing = true;
  }

  confirmEditDate(date: MenuDate) {
    date.originalDate = undefined;
    date.originalEntrees = undefined;
    date.originalVeggie = undefined;
    date.originalTreat = undefined;
    date.editing = false;
  }

  cancelEditDate(date: MenuDate) {
    date.entrees = date.originalEntrees;
    date.veggie = date.originalVeggie;
    date.treat = date.originalTreat;
    date.date = moment(date.originalDate).toDate();
    date.originalEntrees = undefined;
    date.originalVeggie = undefined;
    date.originalTreat = undefined;
    date.originalDate = undefined;
    date.editing = false;
  }

  updateMenuDate($event: any, item: any) {
    if (item instanceof Array) {
      item.length = 0;
      item.push.apply(item, $event.map(e => new MenuItem(e)));
    } else {
      Object.assign(item, $event);
      // item.id = $event.id;
    }
  }

  addNewEntree() {
    this.editItem(this.menuData.addNewEntree());
  }

  addNewVeggie() {
    this.editItem(this.menuData.addNewVeggie());
  }

  addNewTreat() {
    this.editItem(this.menuData.addNewTreat());
  }

  addNewMenuDate() {
    const maxDate = this.menuData.dates.sort((a, b) => {
      return a.dateSort.localeCompare(b.dateSort);
    }).slice(-1)[0].date;

    let newDate = moment(maxDate, 'M/D/YYYY');
    do {
      newDate = newDate.add(1, 'd');
    } while (newDate.day() === 0 || newDate.day() === 6);
    this.editDate(this.menuData.addNewMenuDate(newDate.toDate()));
  }

  copySuccess() {
    this.alerts.push({
      type: 'success',
      msg: 'Menu JSON was copied to the clipboard!',
      timeout: 5000
    });
  }

  ngOnInit() {
    this.loadMenu();
  }

  public loadMenu() {
    const thisRef = this;
    this.http.get(this.menuUrl).subscribe(data => {
      const menu = new MenuData(data);
      this.menuData = menu;
      this.isReady = true;

      this.itemTypes = [
        {
          title: 'Entrees',
          items: thisRef.menuData.entrees,
          add: () => {
            thisRef.addNewEntree();
          }
        },
        {
          title: 'Veggies',
          items: thisRef.menuData.veggies,
          add: () => {
            thisRef.addNewVeggie();
          }
        },
        {
          title: 'Treats',
          items: thisRef.menuData.treats,
          add: () => {
            thisRef.addNewTreat();
          }
        }
      ];
    });
  }
}
