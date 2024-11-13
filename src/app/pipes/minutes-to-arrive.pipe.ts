import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minutesToArrive',
  standalone: true,
})
export class MinutesToArrivePipe implements PipeTransform {
  transform(arrivalTime: string): string {
    const arrivalDate = new Date();
    const [hours, minutes, seconds] = arrivalTime.split(':').map(Number);
    arrivalDate.setHours(hours, minutes, seconds);

    const now = new Date();

    const minutesToArrive = Math.floor(
      (arrivalDate.getTime() - now.getTime()) / 60000
    );

    return minutesToArrive ? `${minutesToArrive}'` : 'A chegar';
  }
}
