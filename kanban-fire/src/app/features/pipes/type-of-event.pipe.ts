import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'eventTypePipe', standalone: true })
export class eventTypePipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case 'openAir':
        return 'Na świeżym powietrzu';
      case 'closed':
        return 'W zamkniętym pomieszczeniu';
      default:
        return '-';
    }
  }

}
