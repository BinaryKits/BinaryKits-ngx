import { FormGroup } from "@angular/forms";

export abstract class ComputeContext {
    public readonly formSnapshot: any

    constructor(public root: FormGroup) {
        this.formSnapshot = root.getRawValue()
    }
}

export type ComputContextFactory<T extends ComputeContext> = () => T