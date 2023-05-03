import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emptyPipe',
  standalone: true,
})
export class EmptyPipe implements PipeTransform {
  transform(value: string | number | null | undefined, emptySymbol?: string): string | number {
    if (typeof value === 'undefined' || value === null || Number.isNaN(value) || value === '') {
      return emptySymbol ? emptySymbol : '-';
    }
    return value;
  }
}
