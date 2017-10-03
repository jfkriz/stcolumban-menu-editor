import { MenuItem } from './menuItem';
import { MenuDate } from './menuDate';

export class MenuData {
  public entrees: Array<MenuItem>;
  public veggies: Array<MenuItem>;
  public treats: Array<MenuItem>;
  public dates: Map<Date, MenuDate>;
}