import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ComputeContext, BackpackConfig, BackpackService } from '@binarykits/ngx-formcontrol-companion/backpack';
import { ErrorCounterService } from "@binarykits/ngx-formcontrol-companion/error-counter"
import { AbstractControlPath } from "@binarykits/ngx-formcontrol-companion/utilities"

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
  styleUrls: ['./formcontrol-companion.component.scss'],
  providers: [BackpackService, ErrorCounterService]
})
export class FormcontrolCompanionComponent implements OnInit {
  firstNameConfig = new BackpackConfig<sampleContext>({
    earlierLogic: async (local): Promise<string> => {
      return "Done"
    },
    laterLogic: async (local): Promise<void> => {
      console.log("Running result ealierLogic exists: ", local.result["earlierLogic"])
    }
  })

  lastNameConfig = new BackpackConfig<sampleContext>({
    isReadonly: async (local): Promise<boolean> => {
      const siblingResult = local.computeContext.result["firstName"]
      return local.computeContext.isFirstName4
    }
  }) 

  middleNameConfig = new BackpackConfig<sampleContext>({
    isDisabled: async (local): Promise<boolean> => {
      return local.computeContext.root.controls["firstName"].value === "5"
    },
    isVisible: async (local): Promise<boolean> => {
      return local.computeContext.root.controls["firstName"].value !== "6"
    }
  }) 

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    middleName: [''],
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
      street: ['', Validators.required],
      city: [''],
      state: [''],
      zip: ['']
    })])
  });
  
  errorReport = {}

  constructor(private fb: FormBuilder, private ref: ChangeDetectorRef, public backpack: BackpackService, public errorCounter: ErrorCounterService) {
    this.firstNameConfig.attachTo(this.form.controls["firstName"])
    this.lastNameConfig.attachTo(this.form.controls["lastName"])
    this.middleNameConfig.attachTo(this.form.controls["middleName"])

    // const t = new AbstractControlPath("a.b.c.d")
    // console.log(t.parent(2).toString())
    // console.log(t.sibling("sibling").toString())
    // console.log(t.child(["e","0", "f"]).toString())
    // console.log(new AbstractControlPath("a").parent().toString())
    // console.log(new AbstractControlPath("a.b.c.3").arrayIndex.toString())
  }

  ngOnInit(): void {
    this.form.valueChanges.pipe(debounceTime(100)).subscribe(async () => await this.onFormValueUpdate())
    this.onFormValueUpdate()
  }

  async onFormValueUpdate() {
    this.ref.detach()
    const resultContext = await this.backpack.updateComputedProperties(() => new sampleContext(this.form))
    this.backpack.recursivelyUpdateDisableStatus(this.form)
    this.errorCounter.updateErrorCounts(this.form)
    this.ref.reattach()

    // For debug
    this.errorReport = this.errorCounter.getErrorReport(this.form)
  }
}

