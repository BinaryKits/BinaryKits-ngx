import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';

@Pipe({
  name: 'asFormArray'
})
export class AsFormArrayPipe implements PipeTransform {

  transform(node: AbstractControl | null): FormArray {
    return node as FormArray
  }

}

@Pipe({
  name: 'childFormGroupsAsArray'
})
export class ChildFormGroupsArrayPipe implements PipeTransform {

  transform(node: AbstractControl | null): FormGroup[] {
    return (node as FormArray).controls as FormGroup[]
  }

}

@Pipe({
  name: 'asFormGroup'
})
export class AsFormGroupPipe implements PipeTransform {

  transform(node: AbstractControl | null): FormGroup {
    return node as FormGroup
  }

}

@Pipe({
  name: 'asFormControl'
})
export class AsFormControlPipe implements PipeTransform {

  transform(node: AbstractControl | null): FormControl {
    return node as FormControl
  }

}



// @Pipe({
//   name: 'as',
//   pure: true,
// })
// export class AsPipe implements PipeTransform {

//   transform<T>(value: any, clss: new (...args: any[]) => T): T {
//     return value as T;
//   }

// }