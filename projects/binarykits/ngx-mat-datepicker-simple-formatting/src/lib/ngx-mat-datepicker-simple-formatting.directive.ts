import { Directive, ElementRef, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker/datepicker-input-base';
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { Subscription } from 'rxjs';


@Directive({
  selector: 'input[bkMatDatepickerSimpleFormatting]'
})
export class NgxMatDatepickerSimpleFormattingDirective implements OnInit, OnDestroy {
  @Input() bkMatDatepickerSimpleFormatting!: AbstractControl
  @Input() sourceFormat = "YYYY-MM-DD"
  input: HTMLInputElement  // matDatePicker will always save "MM/DD/YYYY" here
  subscriptions: Subscription[] = []
  matDatePickerFormat = "MM/DD/YYYY"

  constructor(el: ElementRef<HTMLInputElement>) {
    dayjs.extend(customParseFormat)
    this.input = el.nativeElement
  }

  ngOnInit(): void {
    this.syncSourceChanges(this.sourceFormControl.value)  // Apply inital value
    const s = this.sourceFormControl.valueChanges.subscribe(value => this.syncSourceChanges(value))
    this.subscriptions.push(s)
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe())
  }

  // User pick date from calendar => source
  @HostListener("dateInput", ["$event"])
  dateInput(event: MatDatepickerInputEvent<Date>): void {
    const newValue = dayjs(event.value).format(this.sourceFormat)
    
    if (newValue !== this.sourceFormControl.value) {  // Avoid infinite loop
      this.sourceFormControl.setValue(newValue)
    }
  }

  // Source formControl changes value => datepicker
  syncSourceChanges(value: string): void {
    const originalValue = dayjs(value, this.sourceFormat).format(this.matDatePickerFormat)
    if (originalValue !== "Invalid Date") {
      this.input.value = originalValue
      this.input.dispatchEvent(new Event("input"))
    }
  }

  get sourceFormControl(): AbstractControl {
    return this.bkMatDatepickerSimpleFormatting as AbstractControl
  }
}
