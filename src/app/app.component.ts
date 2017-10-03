import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  public isEntreesCollapsed: boolean;
  public isVeggiesCollapsed: boolean;
  public isTreatsCollapsed: boolean;
  public isJsonCollapsed: boolean;

  public AppComponent() {
    this.isEntreesCollapsed = false;
    this.isVeggiesCollapsed = false;
    this.isTreatsCollapsed = false;
    this.isJsonCollapsed = true;
  }
}
