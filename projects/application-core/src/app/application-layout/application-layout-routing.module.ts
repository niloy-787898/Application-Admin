import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationLayoutComponent } from './application-layout.component';
import { DashboardComponent } from '../component/dashboard/dashboard.component';


const routes: Routes = [
  {
    path: '', component: ApplicationLayoutComponent, 
    children: [
      { path: 'dashboard', component: DashboardComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicationLayoutRoutingModule {}
