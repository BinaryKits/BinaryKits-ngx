import { NgModule } from '@angular/core';
import { MaskDateDirective } from './mask-date.directive';


@NgModule({
  declarations: [
    MaskDateDirective
  ],
  exports: [
    MaskDateDirective
  ]
})
export class MaskDateModule { }
