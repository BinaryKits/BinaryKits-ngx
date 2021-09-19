import { AbstractControl } from "@angular/forms"
import { ComputeContext } from ".."
import { ComputedBag } from "./ComputedBag"

type computeLogic<T extends ComputeContext> = (context: T, control: AbstractControl, path: string) => Promise<any>

export class ComputedBagConfig<T extends ComputeContext> {

    constructor(public items: { [key: string]: computeLogic<T> }) {
    }

    public attachTo(control: AbstractControl): AbstractControl {
        (control as any).computedBag = new ComputedBag<T>(this)
        return control
    }
}