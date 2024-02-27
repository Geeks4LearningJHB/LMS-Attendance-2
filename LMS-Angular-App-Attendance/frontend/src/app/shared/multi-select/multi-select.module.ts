import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiSelectComponent } from './multi-select.component';
import { ListFilterPipe } from './list-filter.pipe';
import { ClickOutsideDirective } from './click-outside.directive';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MultiSelectComponent,
    ListFilterPipe,
    ClickOutsideDirective,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    MultiSelectComponent,
    ListFilterPipe,
  ]
  })
export class MultiSelectModule { }
