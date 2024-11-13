import { Routes } from '@angular/router';
import { RoutesComponent } from './components/routes/routes.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { SearchStopComponent } from './components/search-stop/search-stop.component';
import { StopsComponent } from './components/routes/stops/stops.component';
import { ArrivalsComponent } from './components/routes/stops/arrivals/arrivals.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/routes',
    pathMatch: 'full',
  },
  {
    path: 'routes',
    component: RoutesComponent,
  },
  {
    path: 'routes/:route_id/stops',
    component: StopsComponent,
  },
  {
    path: 'stops/:stop_id/nextArrivals',
    component: ArrivalsComponent,
  },
  {
    path: 'favorites',
    component: FavoritesComponent,
  },
  {
    path: 'search',
    component: SearchStopComponent,
  },
  { path: '**', redirectTo: '/' },
];
