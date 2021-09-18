import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { computerBag, ComputeContext, ComputedBagConfig } from '@binarykits/ngx-formcontrol-companion/computedBag';

class localComputeContext extends ComputeContext {
  constructor(public root: FormGroup) {
    super(root);
  }
}

@Component({
  selector: 'app-formcontrol-companion',
  templateUrl: './formcontrol-companion.component.html',
  styleUrls: ['./formcontrol-companion.component.scss']
})
export class FormcontrolCompanionComponent implements OnInit {
  firstNameConfig = new ComputedBagConfig<localComputeContext>({
    isDisabled: async (context, control, path): Promise<boolean> => {
      return control.value === "3"
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
    const context = new localComputeContext(this.form)
    await computerBag.updateAllBags(context)

    // Update disable
    computerBag.updateControlDisableStatus(this.form)
  }
}


