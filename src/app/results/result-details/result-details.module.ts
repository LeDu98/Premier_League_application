import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResultDetailsPageRoutingModule } from './result-details-routing.module';

import { ResultDetailsPage } from './result-details.page';
import {ScorerElementComponent} from "../scorer-element/scorer-element.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResultDetailsPageRoutingModule
  ],
    declarations: [ResultDetailsPage, ScorerElementComponent]
})
export class ResultDetailsPageModule {}
