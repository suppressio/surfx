import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DomNavComponent } from './dom-nav/dom-nav.component';

const routes: Routes = [
  { path: 'main', component: DomNavComponent },
  { path: '',   redirectTo: '/main', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
