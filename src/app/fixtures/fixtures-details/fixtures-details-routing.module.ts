import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FixturesDetailsPage } from './fixtures-details.page';

const routes: Routes = [
  {
    path: '',
    component: FixturesDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FixturesDetailsPageRoutingModule {}
