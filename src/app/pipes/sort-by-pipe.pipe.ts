import { Pipe, PipeTransform } from '@angular/core';

export interface userItem {
  email: string,
  password: string,
  permissions?: any,
  registrationDate: Date,
  role: { _id: string, title: string },
  username: string,
  _id: string
}

@Pipe({
  name: 'sortByRole'
})
export class SortByRolePipe implements PipeTransform {

  transform(values: userItem[], direction: string, column: keyof userItem, type: string) {
    let sortedItems: userItem[] = [];
    sortedItems = direction === 'asc' ?
      this.sortAscending(values, column, type) :
      this.sortDescending(values, column, type)
    return sortedItems;
  }

  sortAscending(items: userItem[], column: keyof userItem, type: string) {
    return [...items.sort((a: userItem, b: userItem) => {

      if (type === 'timestamp') {
        return new Date(a[column]).getTime() - new Date(b[column]).getTime()
      }

      if (column === 'role') {
        if (a[column].title.toUpperCase() < b[column].title.toUpperCase()) return -1;
      }

      if (a[column] > b[column]) {
        return 1
      };

      if (a[column] < b[column]) {
        return -1
      }

      return 0;
    })]

  }

  sortDescending(items: userItem[], column: keyof userItem, type: string) {
    return [...items.sort((a: userItem, b: userItem) => {

      if (type === 'timestamp') new Date(b[column]).getTime() - new Date(a[column]).getTime()

      if (column === 'role') {
        if (a[column].title.toUpperCase() > b[column].title.toUpperCase()) return -1;
      }

      if (a[column] < b[column]) {
        return 1;
      }
      if (a[column] > b[column]) {
        return -1;
      }

      return 0;
    })]
  }

}