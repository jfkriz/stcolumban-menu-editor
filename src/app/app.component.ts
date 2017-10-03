import { Component, OnInit } from '@angular/core';
import { MenuData } from './models/menuData';
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
    let filtered = items.filter(val => {
      return val.id != item.id;
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
    if(item.id !== item.originalId) {
      this.menuData.dates.forEach(date => {
        let i: number;
        if((i = date.entrees.indexOf(item.originalId)) >= 0) {
          date.entrees[i] = item.id;
        } else if(date.veggie == item.originalId) {
          date.veggie = item.id;
        } else if(date.treat == item.originalId) {
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

  ngOnInit() {
    this.http.get('https://s3.amazonaws.com/lambda-function-bucket-us-east-1-1486176755721/SaintColumban/menu.json').subscribe(data => {
      this.menuData = <MenuData>data;
      this.isReady = true;
    });
  }
}
