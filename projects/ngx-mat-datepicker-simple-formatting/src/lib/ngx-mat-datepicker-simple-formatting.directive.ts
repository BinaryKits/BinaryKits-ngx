import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker/datepicker-input-base';
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'


@Directive({
  selector: 'input[bkMatDatepickerSimpleFormatting]'
})
export class NgxMatDatepickerSimpleFormattingDirective implements OnInit {
  @Input() bkMatDatepickerSimpleFormatting!: AbstractControl;
  @Input() sourceFormat = "YYYY-MM-DD"
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
    const newValue = dayjs(event.value).format(this.sourceFormat)
    this.sourceFormControl.setValue(newValue)
  }

  // Source formControl changes value => datepicker
  syncSourceChanges(value: string): void {
    const newValueInDayjs = dayjs(value, this.sourceFormat)

    if (newValueInDayjs.format(this.sourceFormat) !== value) { // Not a valid date string
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
    return this.bkMatDatepickerSimpleFormatting as AbstractControl
  }
}
