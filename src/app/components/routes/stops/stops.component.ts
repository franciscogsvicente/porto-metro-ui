import { AfterViewInit, Component, inject } from '@angular/core';
import { PortoMetroService } from '../../../services/porto-metro.service';
import { filter, map, Observable, switchMap, tap } from 'rxjs';
import { Stop } from '../../../models/stop';
import { ActivatedRoute, ParamMap, RouterModule } from '@angular/router';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
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

  stops$: Observable<Stop[]> = this.route.paramMap.pipe(
    map((params: ParamMap) => params.get('route_id')),
    filter((routeId: string | null) => routeId !== null),
    tap((routeId: string) => (this.routeId = routeId)),
    switchMap((routeId: string) =>
      this.portoMetroService.getStopsByRouteId(routeId)
    )
  );

  routeId: string = '';
}
