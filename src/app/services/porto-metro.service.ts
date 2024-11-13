import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Route } from '../models/route';
import { Stop } from '../models/stop';
import { Arrival } from '../models/arrival';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PortoMetroService {
  constructor(private http: HttpClient) {}

  private readonly API_URL = environment.API_URL;

  getRoutes(): Observable<Route[]> {
    return this.http.get<Route[]>(`${this.API_URL}/routes`);
  }

  getStops(search?: string): Observable<Stop[]> {
    let params = new HttpParams();

    if (search) {
      params = params.append('q', search);
    }

    return this.http.get<Stop[]>(`${this.API_URL}/stops`, { params });
  }

  getStopsByRouteId(routeId: string): Observable<Stop[]> {
    return this.http.get<Stop[]>(`${this.API_URL}/routes/${routeId}/stops`);
  }

  getNextArrivals(stopId: string): Observable<Arrival[]> {
    return this.http.get<Arrival[]>(
      `${this.API_URL}/stops/${stopId}/nextArrivals`
    );
  }
}
