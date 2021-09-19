import { Directive, ElementRef, forwardRef, HostListener, Inject, Input, OnChanges } from '@angular/core'
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { config, CustomKeyboardEvent, IConfig, MaskDirective, MaskService } from 'ngx-mask'
import { DOCUMENT } from '@angular/common'

@Directive({
    selector: 'input[bkMaskDate]',
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgxMaskDateDirective), multi: true, },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => NgxMaskDateDirective), multi: true, },
        MaskService,
    ]
})
export class NgxMaskDateDirective extends MaskDirective implements ControlValueAccessor, OnChanges, Validator {
    input: HTMLInputElement
    localMaskService: MaskService

    @Input('bkMaskDate') public maskExpression!: string
    @Input() public formControlFormat = 'YYYY-MM-DD'
    @Input() public userInputFormat!: string

    constructor(@Inject(DOCUMENT) document: any,
        maskService: MaskService,
        @Inject(config) iConfig: IConfig,
        protected el: ElementRef<HTMLInputElement>) {
        super(document, maskService, iConfig)
        this.input = el.nativeElement
        this.localMaskService = maskService
        dayjs.extend(customParseFormat)
    }

    public async writeValue(inputValue: string | number | { value: string | number; disable?: boolean }): Promise<void> {
        if (typeof inputValue !== 'string') {
            return
        }

        const newValueInDayjs = dayjs(inputValue, this.formControlFormat)

        if (newValueInDayjs.format(this.formControlFormat) !== inputValue) {  // Not valid date string
            return
        }

        this.input.value = newValueInDayjs.format(this.userInputFormat)
    }

    @HostListener('input', ['$event'])
    public onInput(e: CustomKeyboardEvent): void {
        super.onInput(e)
        this.updateFormControlFromInputValue(this.input.value)
    }

    updateFormControlFromInputValue(value: string): void {
        const newValueInDayjs = dayjs(value, this.userInputFormat)

        // Not valid date string
        if (value === '' || newValueInDayjs.format(this.userInputFormat) !== value) {
            this.onChange(null)
            return
        }

        const newValue = newValueInDayjs.format(this.formControlFormat)
        this.onChange(newValue)
    }
}