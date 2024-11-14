import { Component, inject } from '@angular/core';
import { PortoMetroService } from '../../services/porto-metro.service';
import { Observable } from 'rxjs';
import { AsyncPipe, NgForOf, NgStyle } from '@angular/common';
import { Route } from '../../models/route';
import { RoutesPipe } from '../../pipes/routes.pipe';
import { RouterModule } from '@angular/router';
import { BaseComponent } from '../shared/base/base.component';

@Component({
  selector: 'app-routes',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    RoutesPipe,
    NgStyle,
    RouterModule,
    BaseComponent,
  ],
  templateUrl: './routes.component.html',
  styleUrl: './routes.component.scss',
})
export class RoutesComponent {
  private portoMetroService = inject(PortoMetroService);

  routes$: Observable<Route[]> = this.portoMetroService.getRoutes();

  constructor() {}
}
