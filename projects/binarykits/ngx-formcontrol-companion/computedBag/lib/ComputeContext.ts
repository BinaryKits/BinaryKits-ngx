import { FormGroup } from "@angular/forms";

export abstract class ComputeContext {
    public readonly formValue: any

    constructor(public root: FormGroup) {
        this.formValue = root.getRawValue()
    }
}