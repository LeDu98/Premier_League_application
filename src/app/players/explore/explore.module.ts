import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExplorePageRoutingModule } from './explore-routing.module';

import { ExplorePage } from './explore.page';
import {PlayerElementComponent} from '../player-element/player-element.component';
import {PlayerModalComponent} from '../player-modal/player-modal.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ExplorePageRoutingModule
    ],
    declarations: [ExplorePage, PlayerElementComponent, PlayerModalComponent],
    exports: [
        PlayerElementComponent
    ],
    entryComponents: [PlayerModalComponent]
})
export class ExplorePageModule {}
