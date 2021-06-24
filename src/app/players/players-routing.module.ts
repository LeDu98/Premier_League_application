import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayersPage } from './players.page';


/*
const routes: Routes = [
  {
    path: '',
    redirectTo: 'explore',
    component: PlayersPage
  },
  {
    path: 'explore',
    loadChildren: () => import('./explore/explore.module').then( m => m.ExplorePageModule)
  }
];
*/

const routes: Routes = [
  {
    path: '',
    component: PlayersPage,
    children: [
      {
        path: 'explore',
        loadChildren: () => import('./explore/explore.module').then( m => m.ExplorePageModule)
      },
      {
        path: '',
        redirectTo: 'explore',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'explore',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayersPageRoutingModule {}
