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
export class BaseComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: false }) showFavoritesIcon: boolean = false;
  @Input({ required: false }) isFavorite: boolean = false;
  @Input({ required: false }) showBackIcon: boolean = false;

  @Output() onClickFavoritesIcon = new EventEmitter<boolean>();
  @Output() onClickBackIcon = new EventEmitter<void>();

  private networkService = inject(NetworkService);

  isOnline$ = this.networkService.getNetworkStatus();
}
