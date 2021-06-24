import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExplorePage } from './explore.page';


const routes: Routes = [
  {
    path: '',
    component: ExplorePage
  },
  {
    path:':teamId',
    loadChildren:()=>import('./teams-details/teams-details.module').then(n=>n.TeamsDetailsPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExplorePageRoutingModule {}
