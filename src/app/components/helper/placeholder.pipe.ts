import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'placeholder'
})
export class PlaceholderPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    if (value === value.toUpperCase()) {
      return value.charAt(0) + value.toLowerCase().slice(1);
    }
    let newStr = value !== value.toLowerCase() ? value.replace(/\B([A-Z])\B/g, ' $1').toLowerCase() : value
    return newStr.charAt(0).toUpperCase() + newStr.slice(1);
  }

}
