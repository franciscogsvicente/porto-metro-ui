import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'routes',
  standalone: true,
})
export class RoutesPipe implements PipeTransform {
  transform(route: string): string {
    switch (route) {
      case 'A':
        return 'Estádio do Dragão - Sr. de Matosinhos';
      case 'B':
      case 'Bx':
        return 'Estádio do Dragão - Póvoa de Varzim';
      case 'C':
        return 'Campanhã - ISMAI';
      case 'D':
        return "Hospital S. João - Vila d'Este";
      case 'E':
        return 'Trindade - Aeroporto';
      case 'F':
        return 'Fânzeres - Senhora da Hora';
      default:
        return '';
    }
  }
}
