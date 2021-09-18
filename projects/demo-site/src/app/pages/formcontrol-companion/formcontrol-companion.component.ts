import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { updateAllComputedBags, updateControlDisableStatus, ComputeContext, ComputedBagConfig } from 'ngx-formcontrol-companion';

class localComputeContext extends ComputeContext {
  constructor(public formRawValue: any) {
    super(formRawValue);
  }
}

@Component({
  selector: 'app-formcontrol-companion',
  templateUrl: './formcontrol-companion.component.html',
  styleUrls: ['./formcontrol-companion.component.scss']
})
export class FormcontrolCompanionComponent implements OnInit {
  firstNameConfig = new ComputedBagConfig<localComputeContext>({
    isDisabled: async (c: localComputeContext, p: string): Promise<boolean> => {
      return c.formRawValue.firstName === "3"
    }
  })

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
    this.firstNameConfig.attachTo(this.form.controls["firstName"])
    this.form.valueChanges.subscribe(async () => await this.onFormValueUpdate())
  }

  async onFormValueUpdate() {
    const context = new localComputeContext(this.form.getRawValue())
    await updateAllComputedBags(this.form, context)

    // Update disable
    updateControlDisableStatus(this.form)
  }
}


