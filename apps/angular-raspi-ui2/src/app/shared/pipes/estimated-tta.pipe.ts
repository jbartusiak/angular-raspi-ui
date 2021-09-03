import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estimatedTta'
})
export class EstimatedTtaPipe implements PipeTransform {

  transform(value: number): string {
    if (value < 0) { return 'remaining time unknown'; }
    const minutes = value % 60;
    const seconds = value / 60 - minutes;
    return `${minutes} min, ${seconds} sec`;
  }

}
