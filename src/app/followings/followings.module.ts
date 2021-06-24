import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FollowingsPageRoutingModule } from './followings-routing.module';

import { FollowingsPage } from './followings.page';
import {ExplorePageModule} from '../teams/explore/explore.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        FollowingsPageRoutingModule,
        ExplorePageModule
    ],
  declarations: [FollowingsPage]
})
export class FollowingsPageModule {}
