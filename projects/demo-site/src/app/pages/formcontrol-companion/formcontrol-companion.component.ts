import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ComputeContext, BackpackConfig, BackpackService } from '@binarykits/ngx-formcontrol-companion/backpack';
import { ErrorCounterService } from "@binarykits/ngx-formcontrol-companion/error-counter"
import { debounceTime } from 'rxjs/operators'

class sampleContext extends ComputeContext {
  isFirstName4: boolean

  constructor(public root: FormGroup) {
    super(root);
    this.isFirstName4 = this.formSnapshot.firstName === "4"
  }
}

@Component({
  selector: 'app-formcontrol-companion',
  templateUrl: './formcontrol-companion.component.html',
  styleUrls: ['./formcontrol-companion.component.scss']
})
export class FormcontrolCompanionComponent implements OnInit {
  firstNameConfig = new BackpackConfig<sampleContext>({
    isDisabled: async (local): Promise<boolean> => {
      return local.control.value === "3"
    },
    test: async (local): Promise<void> => {
      const isDisabledResult = local.result["isDisabled"]
      console.log("Running result isDisabled exists: ", isDisabledResult)
    }
  })

  lastNameConfig = new BackpackConfig<sampleContext>({
    isReadonly: async (local): Promise<boolean> => {
      const siblingResult = local.computeContext.result["firstName"]
      return local.computeContext.isFirstName4
    }
  }) 

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    addresses: this.fb.array([this.fb.group({
      street: ['', Validators.required],
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
  backpack = new BackpackService()
  errorCounter = new ErrorCounterService()
  errorReport = {}

  constructor(private fb: FormBuilder, private ref: ChangeDetectorRef) {
    this.firstNameConfig.attachTo(this.form.controls["firstName"])
    this.lastNameConfig.attachTo(this.form.controls["lastName"])
  }

  ngOnInit(): void {
    this.form.valueChanges.pipe(debounceTime(100)).subscribe(async () => await this.onFormValueUpdate())
    this.onFormValueUpdate()
  }

  async onFormValueUpdate() {
    this.ref.detach()
    const resultContext = await this.backpack.updateComputedProperties(() => new sampleContext(this.form))
    this.backpack.recursivelyDisable(this.form)
    this.errorCounter.updateErrorCounts(this.form)
    this.ref.reattach()

    // For debug
    this.errorReport = this.errorCounter.getErrorReport(this.form)

  }
}

