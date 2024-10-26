import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { PartidaComponent } from './components/partida/partida.component';
import { cartonesGuard } from './core/guards/cartones.guard';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
  },

  {
    path: 'partida',
    component: PartidaComponent,
    canMatch: [cartonesGuard],
  },

  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
    component: MainPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
