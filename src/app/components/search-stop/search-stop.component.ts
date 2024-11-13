import { Component, inject } from '@angular/core';
import { PortoMetroService } from '../../services/porto-metro.service';
import {
  distinctUntilChanged,
  Observable,
  filter,
  switchMap,
  debounceTime,
} from 'rxjs';
import { Stop } from '../../models/stop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-search-stop',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgFor,
    NgIf,
    AsyncPipe,
    RouterModule,
    HeaderComponent,
  ],
  templateUrl: './search-stop.component.html',
  styleUrl: './search-stop.component.scss',
})
export class SearchStopComponent {
  private portoMetroService = inject(PortoMetroService);

  searchStop: FormControl = new FormControl('');
  stops$: Observable<Stop[]> = this.searchStop.valueChanges.pipe(
    distinctUntilChanged(),
    debounceTime(300),
    filter((search: string) => search.length > 2),
    switchMap((search: string) => this.portoMetroService.getStops(search))
  );
}
