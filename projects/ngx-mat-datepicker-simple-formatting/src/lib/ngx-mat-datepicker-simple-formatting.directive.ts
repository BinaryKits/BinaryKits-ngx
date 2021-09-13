import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { dateInputsHaveChanged, MatDatepickerInputEvent } from '@angular/material/datepicker/datepicker-input-base';
import * as dayjs from 'dayjs'
import * as customParseFormat from 'dayjs/plugin/customParseFormat'


@Directive({
  selector: 'input[bkMatDatepickerSimpleFormatting]'
})
export class NgxMatDatepickerSimpleFormattingDirective implements OnInit {
  @Input('bkMatDatepickerSimpleFormatting') option!: Option;
  input: HTMLInputElement

  constructor(el: ElementRef<HTMLInputElement>) {
    dayjs.extend(customParseFormat)
    this.input = el.nativeElement
  }

  ngOnInit(): void {
    this.sourceFormControl.valueChanges.subscribe(value => this.syncSourceChanges(value))
  }

  // User pick date from calendar => source
  @HostListener("dateInput", ["$event"])
  dateInput(event: MatDatepickerInputEvent<Date>): void {
    const newValue = dayjs(event.value).format(this.option.format)
    this.sourceFormControl.setValue(newValue)
  }

  // Source formControl changes value => datepicker
  syncSourceChanges(value: string): void {
    const newValueInDayjs = dayjs(value, this.option.format)

    if (newValueInDayjs.format(this.option.format) !== value) { // Not a valid date string
      return
    }

    const newValue = newValueInDayjs.toDate().toLocaleDateString() // Value used by the mat-datepicker
    if (this.input.value === newValue) {
      return
    }

    this.input.value = newValue
    this.input.dispatchEvent(new Event("input"))
  }

  get sourceFormControl(): AbstractControl {
    return this.option.formControl as AbstractControl
  }
}

class Option {
  formControl?: AbstractControl | null
  format = "YYYY-MM-DD"
}
