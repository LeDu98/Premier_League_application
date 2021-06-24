import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StandingsPageRoutingModule } from './standings-routing.module';

import { StandingsPage } from './standings.page';
import {ExplorePageModule} from '../teams/explore/explore.module';
import {
  TeamElementStandingComponent
} from './team-element-standing/team-element-standing.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        StandingsPageRoutingModule,
        ExplorePageModule
    ],
  declarations: [StandingsPage, TeamElementStandingComponent]
})
export class StandingsPageModule {}
