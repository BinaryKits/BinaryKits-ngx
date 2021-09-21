import { AbstractControl } from "@angular/forms"
import { ComputeContext } from "./ComputeContext"
import { BackpackContainer } from "./BackpackContainer"
import { ATTACH_POINT } from "./helpers"
import { ControlContext } from ".."

export type ComputeLogic<T extends ComputeContext> = (local: ControlContext<T>) => Promise<any>

export class BackpackConfig<T extends ComputeContext> {

    constructor(public computedPropertyLogics: { [key: string]: ComputeLogic<T> }) {
    }

    public attachTo(control: AbstractControl): AbstractControl {
        (control as any)[ATTACH_POINT] = new BackpackContainer(this)
        return control
    }
}