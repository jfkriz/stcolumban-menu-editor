import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CollapseModule } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { TabsModule } from 'ngx-bootstrap';
import { ObjectValuesPipe } from './pipes/objectValuesPipe';
import { MapValuesPipe } from './pipes/mapValuesPipe';
import { MenuItemPipe } from './pipes/menuItemPipe';
import { SelectModule } from 'ng2-select';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { ClipboardModule } from 'ngx-clipboard';
import { AlertModule } from 'ngx-bootstrap';
import { TooltipModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    ObjectValuesPipe,
    MapValuesPipe,
    MenuItemPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    TabsModule.forRoot(),
    CollapseModule.forRoot(),
    SelectModule,
    BsDatepickerModule.forRoot(),
    ClipboardModule,
    AlertModule.forRoot(),
    TooltipModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
