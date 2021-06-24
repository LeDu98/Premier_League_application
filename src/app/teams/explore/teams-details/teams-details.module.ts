import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeamsDetailsPageRoutingModule } from './teams-details-routing.module';

import { TeamsDetailsPage } from './teams-details.page';
import {ExplorePageModule} from "../../../players/explore/explore.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TeamsDetailsPageRoutingModule,
        ExplorePageModule
    ],
  declarations: [TeamsDetailsPage]
})
export class TeamsDetailsPageModule {}
