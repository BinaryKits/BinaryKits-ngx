import { AbstractControl } from "@angular/forms";
import { keyValuePair } from "..";
import { ComputeContext } from "./ComputeContext";

export class ControlContext<T extends ComputeContext> {
    result: keyValuePair

    constructor(public path: string, public control: AbstractControl, public computeContext: T) {
        this.result = this.computeContext.result[this.path]
    }
}