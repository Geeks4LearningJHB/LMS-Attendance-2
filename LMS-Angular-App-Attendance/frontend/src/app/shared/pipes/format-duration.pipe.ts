import { Pipe, PipeTransform } from '@angular/core';
import * as lodash from 'lodash-es';

@Pipe({
  name: 'formatDuration'
})
export class FormatDurationPipe implements PipeTransform {
  getTimeFormat(timesplit: Array<string>): string {
    const [hours, minutes, _] = timesplit

    let timerFormat = ``

    if (lodash.toNumber(hours) > 0)
      timerFormat += `${lodash.toNumber(hours)} hr `

    if (lodash.toNumber(minutes) > 0)
      timerFormat += `${lodash.toNumber(minutes)} min`

    return timerFormat;
  }

  transform(value: string, ...args: unknown[]): unknown {
    return this.getTimeFormat(value.split(':'));
  }
}
