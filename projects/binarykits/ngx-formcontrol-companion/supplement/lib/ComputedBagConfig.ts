import { AbstractControl } from "@angular/forms"
import { ComputeContext } from "./ComputeContext"
import { ComputedBag } from "./ComputedBag"
import { ATTACH_POINT } from "./helpers"

export type ComputeLogic<T extends ComputeContext> = (context: T, control: AbstractControl, path: string) => Promise<any>

export class ComputedBagConfig<T extends ComputeContext> {

    constructor(public items: { [key: string]: ComputeLogic<T> }) {
    }

    public attachTo(control: AbstractControl): AbstractControl {
        (control as any)[ATTACH_POINT] = new ComputedBag<T>(this)
        return control
    }
}