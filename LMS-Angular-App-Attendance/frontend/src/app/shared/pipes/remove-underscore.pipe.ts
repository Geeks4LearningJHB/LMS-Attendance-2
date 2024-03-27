import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeUnderscore'
})
export class RemoveUnderscorePipe implements PipeTransform {


  transform(value: string, ...args: unknown[]): unknown {
    return value?.replace(/_/gi, ' ');;
  }

}
  