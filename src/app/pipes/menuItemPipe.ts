import { Pipe, PipeTransform } from '@angular/core';
import { MenuItem } from '../models/menuItem';

@Pipe({ name: 'menuItem', pure: true })
export class MenuItemPipe implements PipeTransform {
    transform(value: string, items: MenuItem[], defaultValue: any = null): any {
      const keys = value.split(';');
      const found = items.filter(i => keys.indexOf(i.id) >= 0);
      if (found.length === 0) {
        return defaultValue === null ? undefined : defaultValue;
      }
      return found.map(item => item.description).join(' or ');
    }
}
