import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { TabsPageRoutingModule } from './frontdoor-routing.module';

import { FrontdoorPage } from './frontdoor-page.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [FrontdoorPage]
})
export class FrontdoorModule {


}
