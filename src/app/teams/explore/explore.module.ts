import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExplorePageRoutingModule } from './explore-routing.module';

import { ExplorePage } from './explore.page';
import {TeamElementComponent} from '../team-element/team-element.component';
import {TeamModalComponent} from '../team-modal/team-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExplorePageRoutingModule
  ],
  exports: [
    TeamElementComponent
  ],
  declarations: [ExplorePage, TeamElementComponent, TeamModalComponent],
  entryComponents: [TeamModalComponent]
})
export class ExplorePageModule {}
