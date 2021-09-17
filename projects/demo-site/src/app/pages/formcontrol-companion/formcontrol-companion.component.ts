import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { iterateAllChildControls, updateAllComputedBags } from 'ngx-formcontrol-companion';
import { ComputedBagConfig } from 'projects/ngx-formcontrol-companion/src/lib/computed/ComputedBagConfig';
import { ComputedBagContext } from 'projects/ngx-formcontrol-companion/src/public-api';

@Component({
  selector: 'app-formcontrol-companion',
  templateUrl: './formcontrol-companion.component.html',
  styleUrls: ['./formcontrol-companion.component.scss']
})
export class FormcontrolCompanionComponent implements OnInit {
  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: [''],
    addresses: this.fb.array([this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      zip: [''],
      aliases: this.fb.array([
        this.fb.control(''),
        this.fb.control('')
      ]),
    }), this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      zip: ['']
    })])
  });

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    (this.form.controls['firstName'] as any).computedBagConfig = {
      source: "a",
      items: {
        isDisabled: (c: ComputedBagContext, p: string): boolean => {
          if (this.form.getRawValue().firstName === "3") {
            return true
          }

          return false
        }
      } as { [key: string]: (context: ComputedBagContext, path: string) => any }
    } as ComputedBagConfig
    // updateComputedHooksFormGroup(this.form)



    this.form.valueChanges.subscribe(value => {
      const context = new ComputedBagContext()
      updateAllComputedBags(this.form, context)

      for (const [p, c] of iterateAllChildControls(this.form)) {
        const cs = c as any
        if (cs.computedBag && cs.computedBag.isDisabled) {
          c.disable({ emitEvent: false })
        }
      }
    })
  }
}
