import { NgModule } from '@angular/core';
import { AsFormArrayPipe, AsFormControlPipe, AsFormGroupPipe, ChildFormGroupsArrayPipe } from './as-pipes.pipe'

const pipes = [
    AsFormArrayPipe, AsFormControlPipe, AsFormGroupPipe, ChildFormGroupsArrayPipe
];

@NgModule({
  declarations: pipes,
  exports: pipes
})
export class AsPipesModule { }