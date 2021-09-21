import { AbstractControl } from "@angular/forms"
import { ComputeContext } from "./ComputeContext"
import { BackpackContainer } from "./BackpackContainer"
import { symbols } from "./helpers"
import { ControlContext } from "./ControlContext"

export type ComputeLogic<T extends ComputeContext> = (local: ControlContext<T>) => Promise<any>

export class BackpackConfig<T extends ComputeContext> {

    constructor(public computedPropertyLogics: { [key: string]: ComputeLogic<T> }) {
    }

    public attachTo(control: AbstractControl): AbstractControl {
        (control as any)[symbols.backpack] = new BackpackContainer(this)
        return control
    }
}