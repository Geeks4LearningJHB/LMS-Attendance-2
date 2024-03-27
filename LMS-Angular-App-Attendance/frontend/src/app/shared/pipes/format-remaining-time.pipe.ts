import { Pipe, PipeTransform } from '@angular/core';
import * as lodash from 'lodash-es';

@Pipe({
  name: 'formatRemainingTime'
})
export class FormatRemainingTimePipe implements PipeTransform {
  getTimeFormat(timesplit: Array<string>): string {
    const [hours, minutes, seconds] = timesplit

    let timerFormat = ``

    if (lodash.toNumber(hours) > 0)
      timerFormat += `${lodash.toNumber(hours)} hr ${lodash.toNumber(minutes)} min `
    else if (lodash.toNumber(minutes) > 0)
      timerFormat += `${lodash.toNumber(minutes)} min `

    timerFormat += `${lodash.toNumber(seconds)} sec`

    return timerFormat;
  }

  transform(value: string, ...args: unknown[]): unknown {
    return this.getTimeFormat(value.split(':'));
  }

}
