import { AbstractControl } from "@angular/forms"
import { ComputeContext } from "./ComputeContext"
import { BackpackContainer } from "./BackpackContainer"
import { attachConfigToControl } from "./helpers"

export type ComputeLogic<T extends ComputeContext> = (context: T, control: AbstractControl, path: string) => Promise<any>

export class ComputedPropertiesConfig<T extends ComputeContext> {

    constructor(public items: { [key: string]: ComputeLogic<T> }) {
    }

    public attachTo(control: AbstractControl): AbstractControl {
        const container = new BackpackContainer(this)
        return attachConfigToControl(container, control)
    }
}