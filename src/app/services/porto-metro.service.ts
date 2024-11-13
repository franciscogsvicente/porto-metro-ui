import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Route } from '../models/route';
import { Stop } from '../models/stop';
import { Arrival } from '../models/arrival';

@Injectable({
  providedIn: 'root',
})
export class PortoMetroService {
  constructor(private http: HttpClient) {}

  private readonly API_URL =
    'https://5522-2001-8a0-f697-da00-2827-bd2f-6cd-436f.ngrok-free.app';

  getRoutes(): Observable<Route[]> {
    return this.http.get<Route[]>(`${this.API_URL}/routes`, {
      headers: {
        'ngrok-skip-browser-warning': 'true',
      },
    });
  }

  getStops(search?: string): Observable<Stop[]> {
    let params = new HttpParams();

    if (search) {
      params = params.append('q', search);
    }

    return this.http.get<Stop[]>(`${this.API_URL}/stops`, {
      params,
      headers: {
        'ngrok-skip-browser-warning': 'true',
      },
    });
  }

  getStopsByRouteId(routeId: string): Observable<Stop[]> {
    return this.http.get<Stop[]>(`${this.API_URL}/routes/${routeId}/stops`, {
      headers: {
        'ngrok-skip-browser-warning': 'true',
      },
    });
  }

  getNextArrivals(stopId: string): Observable<Arrival[]> {
    return this.http.get<Arrival[]>(
      `${this.API_URL}/stops/${stopId}/nextArrivals`,
      {
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      }
    );
  }
}
