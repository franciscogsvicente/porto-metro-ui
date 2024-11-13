import { Component, inject, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { PortoMetroService } from './services/porto-metro.service';
import { NetworkService } from './services/network.service';
import { Observable } from 'rxjs';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import {
  AdMob,
  AdMobBannerSize,
  BannerAdOptions,
  BannerAdPluginEvents,
  BannerAdPosition,
  BannerAdSize,
} from '@capacitor-community/admob';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, NgIf, AsyncPipe, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [PortoMetroService],
})
export class AppComponent implements OnInit {
  private networkService = inject(NetworkService);
  private appMargin: number = 0;

  isOnline$: Observable<boolean> = this.networkService.getNetworkStatus();

  constructor() {}

  async ngOnInit(): Promise<void> {
    await this.initializeAdmob();

    AdMob.addListener(
      BannerAdPluginEvents.SizeChanged,
      (info: AdMobBannerSize) => {
        this.appMargin = parseInt(info.height + '', 10);
        if (this.appMargin > 0) {
          const app: HTMLElement | null = document.querySelector('.btm-nav');
          if (app) {
            app.style.marginBottom = `${this.appMargin}px`;
          }
        }
      }
    );

    AdMob.addListener(BannerAdPluginEvents.FailedToLoad, () => {
      const app: HTMLElement | null = document.querySelector('.btm-nav');
      if (app) app.style.marginBottom = '0px';
    });
  }

  async initializeAdmob(): Promise<void> {
    await AdMob.trackingAuthorizationStatus();

    await AdMob.initialize({
      initializeForTesting: true,
    });

    await this.showBanner();
  }

  async showBanner(): Promise<void> {
    const options: BannerAdOptions = {
      adId: 'android-ad-id',
      isTesting: true,
      position: BannerAdPosition.BOTTOM_CENTER,
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      margin: 0,
    };

    await AdMob.showBanner(options);
  }

  async hideBanner(): Promise<void> {
    await AdMob.hideBanner();
  }
}
