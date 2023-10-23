import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'apps', pathMatch: 'full' },

  {
    path: 'apps',
    loadChildren: () =>
      import('../app/application-layout/application-layout.module').then(
        (m) => m.ApplicationLayoutModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
