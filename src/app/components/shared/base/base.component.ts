import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { NetworkService } from '../../../services/network.service';
import { AsyncPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [HeaderComponent, AsyncPipe, NgClass],
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss',
})
export class BaseComponent implements OnInit {
  @Input({ required: true }) title!: string;
  @Input({ required: false }) showFavoritesIcon: boolean = false;
  @Input({ required: false }) isFavorite: boolean = false;

  @Output() onClickFavoritesIcon = new EventEmitter<boolean>();

  private networkService = inject(NetworkService);

  isOnline$ = this.networkService.getNetworkStatus();

  constructor() {}

  ngOnInit(): void {}
}
