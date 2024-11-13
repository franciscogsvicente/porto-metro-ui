import { Injectable } from '@angular/core';
import { ConnectionStatus, Network } from '@capacitor/network';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  private isOnline = new BehaviorSubject<boolean>(true);

  constructor() {
    this.initializeNetworkListener();
  }

  private async initializeNetworkListener() {
    const status = await Network.getStatus();
    this.isOnline.next(status.connected);

    Network.addListener('networkStatusChange', (status: ConnectionStatus) => {
      this.isOnline.next(status.connected);
    });
  }

  // Retorna um Observable que emite o estado da conexão
  public getNetworkStatus(): Observable<boolean> {
    return this.isOnline.asObservable();
  }
}
