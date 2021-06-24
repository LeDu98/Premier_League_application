import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FixturesDetailsPageRoutingModule } from './fixtures-details-routing.module';

import { FixturesDetailsPage } from './fixtures-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FixturesDetailsPageRoutingModule
  ],
  declarations: [FixturesDetailsPage]
})
export class FixturesDetailsPageModule {}
