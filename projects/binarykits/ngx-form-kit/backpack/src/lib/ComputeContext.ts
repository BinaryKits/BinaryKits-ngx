import { AbstractControl, FormGroup } from "@angular/forms";
import { keyValuePair } from "./helpers";

export abstract class ComputeContext {
    public readonly formSnapshot: any
    public readonly result: keyValuePair = {}

    constructor(public root: FormGroup) {
        this.formSnapshot = root.getRawValue()
    }
}

export type ComputContextFactory<T extends ComputeContext> = () => T
