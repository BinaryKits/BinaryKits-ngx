import { FormGroup } from "@angular/forms";
import { ATTACH_POINT } from "./helpers";

export abstract class ComputeContext {
    public readonly formValue: any

    constructor(public root: FormGroup) {
        this.formValue = root.getRawValue()
    }
}

export type ComputContextFactory<T extends ComputeContext> = () => T