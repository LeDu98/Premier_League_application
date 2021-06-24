import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FixturesPageRoutingModule } from './fixtures-routing.module';
import { FixturesPage } from './fixtures.page';
import {FixturesElementComponent} from './fixtures-element/fixtures-element.component';
import {FixturesModalComponent} from './fixtures-modal/fixtures-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FixturesPageRoutingModule
  ],
    declarations: [FixturesPage, FixturesElementComponent, FixturesModalComponent],
    entryComponents: [FixturesModalComponent]
})
export class FixturesPageModule {}
