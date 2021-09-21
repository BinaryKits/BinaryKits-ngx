import { AbstractControl } from "@angular/forms"
import { ComputeContext } from "./ComputeContext"
import { BackpackContainer } from "./BackpackContainer"
import { attachConfigToControl } from "./helpers"

export type ComputeLogic<T extends ComputeContext> = (context: T, control: AbstractControl, path: string) => Promise<any>

export class BackpackConfig<T extends ComputeContext> {

    constructor(public computedPropertyLogics: { [key: string]: ComputeLogic<T> }) {
    }

    public attachTo(control: AbstractControl): AbstractControl {
        return attachConfigToControl(new BackpackContainer(this), control)
    }
}