import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResultsPage } from './results.page';

const routes: Routes = [
  {
    path: '',
    component: ResultsPage
  },
  {
    path: ':resultId',
    loadChildren: () => import('./result-details/result-details.module').then( m => m.ResultDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResultsPageRoutingModule {}
