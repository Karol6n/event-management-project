import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'subStatusPipe', standalone: true })
export class subStatusPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case 'paid':
        return 'Płatne';
      case 'free':
        return 'Bezpłatne';
      default:
        return '-';
    }
  }

}
