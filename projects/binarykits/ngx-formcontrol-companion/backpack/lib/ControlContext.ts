import { AbstractControl } from "@angular/forms";
import { AbstractControlPath } from "@binarykits/ngx-formcontrol-companion/utilities";
import { keyValuePair } from "..";
import { ComputeContext } from "./ComputeContext";

export class ControlContext<T extends ComputeContext> {
    result: keyValuePair

    constructor(public path: AbstractControlPath, public control: AbstractControl, public computeContext: T) {
        this.result = this.computeContext.result[this.path.toString()]
    }
}