import { Component, OnInit } from '@angular/core';
import { MenuData } from './models/menuData';
import { MenuDate } from './models/menuDate';
import { MenuItem } from './models/menuItem';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  public isDaysCollapsed: boolean;
  public isJsonCollapsed: boolean;
  public menuData: MenuData;
  public isReady: boolean;

  constructor(private http: HttpClient) {
    this.isDaysCollapsed = false;
    this.isJsonCollapsed = true;
    this.isReady = false;
  }

  deleteItem(items: Array<MenuItem>, item: MenuItem) {
    const filtered = items.filter(val => {
      return val.id !== item.id;
    });
    items.length = 0;
    items.push.apply(items, filtered);
  }

  deleteDate(date: Date) {
    delete this.menuData.dates[date.toString()];
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

  editDate(menuDate: MenuDate, allowEditDate: boolean = false) {
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

    menuDate.originalEntrees = menuDate.entrees;
    menuDate.originalVeggie = menuDate.veggie;
    menuDate.originalTreat = menuDate.treat;
    menuDate.editing = true;
    menuDate.allowEditDate = allowEditDate;
  }

  confirmEditDate(date: MenuDate) {
    date.originalEntrees = undefined;
    date.originalVeggie = undefined;
    date.originalTreat = undefined;
    date.editing = false;
    date.allowEditDate = false;
  }

  cancelEditDate(date: MenuDate) {
    date.entrees = date.originalEntrees;
    date.veggie = date.originalVeggie;
    date.treat = date.originalTreat;
    date.originalEntrees = undefined;
    date.originalVeggie = undefined;
    date.originalTreat = undefined;
    date.editing = false;
    date.allowEditDate = false;
  }

  updateMenuDate($event: any, item: any) {
    if (item instanceof Array) {
      item.length = 0;
      item.push.apply(item, $event.map(e => new MenuItem(e)));
    } else {
      item.id = $event.id;
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
    const newDate = new Date(new Date().setHours(0, 0, 0, 0));
    this.editDate(this.menuData.addNewMenuDate(newDate), true);
  }

  ngOnInit() {
    this.http.get('https://s3.amazonaws.com/lambda-function-bucket-us-east-1-1486176755721/SaintColumban/menu.json').subscribe(data => {
      this.menuData = new MenuData(data);
      this.isReady = true;
    });
  }
}
