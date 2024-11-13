import { Component, inject, OnInit } from '@angular/core';
import { PortoMetroService } from '../../../../services/porto-metro.service';
import { filter, map, Observable, switchMap, tap } from 'rxjs';
import { Arrival } from '../../../../models/arrival';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AsyncPipe, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { uniqBy } from 'lodash-es';
import { MinutesToArrivePipe } from '../../../../pipes/minutes-to-arrive.pipe';
import { HeaderComponent } from '../../../header/header.component';
import { StorageService } from '../../../../services/storage.service';
import { Stop } from '../../../../models/stop';
import { BaseComponent } from '../../../shared/base/base.component';

@Component({
  selector: 'app-arrivals',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    AsyncPipe,
    UpperCasePipe,
    MinutesToArrivePipe,
    HeaderComponent,
    BaseComponent,
  ],
  templateUrl: './arrivals.component.html',
  styleUrl: './arrivals.component.scss',
})
export class ArrivalsComponent implements OnInit {
  private portoMetroService = inject(PortoMetroService);
  private route = inject(ActivatedRoute);
  private storageService = inject(StorageService);

  stop?: Stop;
  isFavorite: boolean = false;

  arrivals$: Observable<Arrival[]> = this.route.paramMap.pipe(
    map((params: ParamMap) => params.get('stop_id')),
    filter((stopId: string | null) => stopId !== null),
    switchMap((stopId: string) =>
      this.portoMetroService.getNextArrivals(stopId)
    ),
    map((arrivals: Arrival[]) => uniqBy(arrivals, 'trip_headsign'))
  );

  stopName$: Observable<string> = this.route.paramMap.pipe(
    map((params: ParamMap) => params.get('stop_id')),
    filter((stopId: string | null) => stopId !== null),
    switchMap((stopId) =>
      this.portoMetroService
        .getStops()
        .pipe(map((stops) => stops.find((stop) => stop.stop_id === stopId)))
    ),
    tap((stop) => (this.stop = stop)),
    map((stop) => stop?.stop_name || '')
  );

  constructor() {}

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(async (params: ParamMap) => {
      const stopId = params.get('stop_id');
      const favorites = (await this.storageService.getItem('favorites')) || [];
      this.isFavorite = !!favorites.find((fav: Stop) => fav.stop_id === stopId);
    });
  }

  async onClickFavoritesIcon(action: boolean) {
    const favorites = (await this.storageService.getItem('favorites')) || [];
    const stopIsFavorite = favorites.find(
      (fav: Stop) => fav.stop_id === this.stop?.stop_id
    );

    if (action && !stopIsFavorite) {
      await this.storageService.setItem('favorites', [...favorites, this.stop]);
      this.isFavorite = true;
    } else {
      await this.storageService.setItem(
        'favorites',
        favorites.filter(
          (favorite: Stop) => favorite.stop_id !== this.stop?.stop_id
        )
      );
      this.isFavorite = false;
    }
  }
}
