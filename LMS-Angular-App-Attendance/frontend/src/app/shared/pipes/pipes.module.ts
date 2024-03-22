import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemoveUnderscorePipe } from './remove-underscore.pipe';
import { FormatDurationPipe } from './format-duration.pipe';
import { FormatRemainingTimePipe } from './format-remaining-time.pipe';



@NgModule({
  declarations: [ RemoveUnderscorePipe, FormatDurationPipe, FormatRemainingTimePipe ],
  exports: [ RemoveUnderscorePipe, FormatDurationPipe, FormatRemainingTimePipe ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
