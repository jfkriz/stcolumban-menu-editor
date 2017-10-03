import { Pipe, PipeTransform } from '@angular/core';
import { MenuItem } from '../models/menuItem';

@Pipe({ name: 'menuItem', pure: false })
export class MenuItemPipe implements PipeTransform {
    transform(value: string, items: MenuItem[], defaultValue: any = null): any {
      let keys = value.split(';');
      let found = items.filter(i => { return keys.indexOf(i.id) >= 0; });
      if(found.length == 0) {
        return defaultValue === null ? undefined : defaultValue;
      }
      return found.map(item => { return item.description; }).join(' or ');
    }
}