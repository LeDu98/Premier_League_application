import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeamsDetailsPage } from './teams-details.page';

const routes: Routes = [
  {
    path: '',
    component: TeamsDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamsDetailsPageRoutingModule {}
