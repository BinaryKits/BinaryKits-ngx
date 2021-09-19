import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { ComputeRunner } from '@binarykits/ngx-formcontrol-companion/supplement';
import { ComputeContext, ComputedBagConfig } from '@binarykits/ngx-formcontrol-companion/supplement';
import { ATTACH_POINT } from '@binarykits/ngx-formcontrol-companion/supplement/lib/helpers';
import { debounceTime } from 'rxjs/operators'

class localComputeContext extends ComputeContext {
  rootSnapshot: any

  constructor(public root: FormGroup) {
    super(root);
    this.rootSnapshot = root.getRawValue()
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

  runner: ComputeRunner<localComputeContext>

  constructor(private fb: FormBuilder) {
    this.firstNameConfig.attachTo(this.form.controls["firstName"])
    this.runner = new ComputeRunner(() => new localComputeContext(this.form))


    const s1 = Symbol("yiping")
    const s2 = Symbol("yiping")

    const a = { [s1]: " deeee", [s2]: " bbbbb" }
    a[s1] = "5555555"
    console.log(a)
  }

  ngOnInit(): void {
    this.form.valueChanges.pipe(debounceTime(500)).subscribe(async () => await this.onFormValueUpdate())
  }

  async onFormValueUpdate() {
    await this.runner.updateAll()
    this.runner.recursivelyDisable(this.form)
  }

  queryComputedProperties(control: AbstractControl) {
    return (control as any)[ATTACH_POINT].computedProperties
  }
}

