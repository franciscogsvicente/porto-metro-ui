import { Component, inject } from '@angular/core';
import { PortoMetroService } from '../../../services/porto-metro.service';
import { filter, map, Observable, switchMap, tap } from 'rxjs';
import { Stop } from '../../../models/stop';
import { ActivatedRoute, ParamMap, RouterModule } from '@angular/router';
import { AsyncPipe, NgFor, NgIf, Location } from '@angular/common';
import { RoutesPipe } from '../../../pipes/routes.pipe';
import { BaseComponent } from '../../shared/base/base.component';

@Component({
  selector: 'app-stops',
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe, RoutesPipe, RouterModule, BaseComponent],
  templateUrl: './stops.component.html',
  styleUrl: './stops.component.scss',
})
export class StopsComponent {
  private portoMetroService = inject(PortoMetroService);
  private route = inject(ActivatedRoute);
  private location = inject(Location);

  routeId$: Observable<string> = this.route.paramMap.pipe(
    map((params: ParamMap) => params.get('route_id')),
    filter((routeId): routeId is string => routeId !== null)
  );

  stops$: Observable<Stop[]> = this.routeId$.pipe(
    switchMap((routeId) => this.portoMetroService.getStopsByRouteId(routeId))
  );

  goBack() {
    this.location.back();
  }
}
