import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: false }) showFavoritesIcon: boolean = false;
  @Input({ required: false }) isFavorite: boolean = false;
  @Input({ required: false }) showBackIcon: boolean = false;

  @Output() onClickFavoritesIcon = new EventEmitter<boolean>();
  @Output() onClickBackIcon = new EventEmitter<void>();
}
