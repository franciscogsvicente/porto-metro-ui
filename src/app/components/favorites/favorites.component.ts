import { Component, inject, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { Stop } from '../../models/stop';
import { RouterModule } from '@angular/router';
import { NgFor } from '@angular/common';
import { BaseComponent } from '../shared/base/base.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [NgFor, RouterModule, BaseComponent, HeaderComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent implements OnInit {
  private storageService = inject(StorageService);

  favorites!: Stop[];

  constructor() {}

  async ngOnInit(): Promise<void> {
    this.favorites = await this.storageService.getItem('favorites');
  }
}
