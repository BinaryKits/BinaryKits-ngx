import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, AbstractControl, FormControl } from '@angular/forms';
import { ComputeRunner, ComputeContext, ComputedPropertiesConfig, queryComputed, getBackpack, ComputeLogic } from '@binarykits/ngx-formcontrol-companion/backpack';
import { debounceTime } from 'rxjs/operators'

class localComputeContext extends ComputeContext {
  rootSnapshot: any
  isFirstName4: boolean

  constructor(public root: FormGroup) {
    super(root);
    this.rootSnapshot = root.getRawValue()
    this.isFirstName4 = this.rootSnapshot.firstName === "4"
  }
}

@Component({
  selector: 'app-formcontrol-companion',
  templateUrl: './formcontrol-companion.component.html',
  styleUrls: ['./formcontrol-companion.component.scss']
})
export class FormcontrolCompanionComponent implements OnInit {
  firstNameConfig = new ComputedPropertiesConfig<localComputeContext>({
    isDisabled: async (context, control, path): Promise<boolean> => {
      return control.value === "3"
    }
  })

  lastNameConfig = new ComputedPropertiesConfig<localComputeContext>({
    isReadonly: async (context, control, path): Promise<boolean> => {
      return context.isFirstName4
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
    this.lastNameConfig.attachTo(this.form.controls["lastName"])

    this.runner = new ComputeRunner(() => new localComputeContext(this.form))
  }

  ngOnInit(): void {
    this.form.valueChanges.pipe(debounceTime(100)).subscribe(async () => await this.onFormValueUpdate())
    this.onFormValueUpdate()
  }

  async onFormValueUpdate() {
    await this.runner.updateAll()
    this.runner.recursivelyDisable(this.form)
  }

  queryComputed = queryComputed
  getBackpack = getBackpack
}

