import { Pipe, PipeTransform } from '@angular/core';
import { userItem } from '../models/user.model';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(items: userItem[], searchTerm: any) {
    let filteredList: any = [];
    if (searchTerm) {
      let newSearchTerm = !isNaN(searchTerm) ? searchTerm.toString() : searchTerm.toString().toUpperCase();
      let prop;
      return items.filter((item: any) => {
        for (let key in item) {
          prop = isNaN(item[key]) ? item[key].toString().toUpperCase() : item[key].toString();
          if (prop.indexOf(newSearchTerm) > -1) {
            filteredList.push(item);
            return filteredList;
          }
        }
      })
    }
    else {
      return items;
    }
  }
}