import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByRole'
})
export class SortByRolePipe implements PipeTransform {

  transform(values: any[], ...args: unknown[]) {

    return values.sort((a, b) => {
      if (a.role.title > b.role.title) {
        return 1;
      }
      if (a.role.title < b.role.title) {
        return -1;
      }

      if (a.username > b.username) {
        return 1;
      }
      if (a.username < b.username) {
        return -1;
      }

      return 0;
    })
  }

}
