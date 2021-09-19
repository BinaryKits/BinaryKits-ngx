import { AbstractControl } from "@angular/forms"
import { ComputedBag } from "./ComputedBag"

type computeLogic<TContext> = (context: TContext, control: AbstractControl, path: string) => Promise<any>

export class ComputedBagConfig<TContext> {

    constructor(public items: { [key: string]: computeLogic<TContext> }) {
    }

    public attachTo(control: AbstractControl): AbstractControl {
        (control as any).computedBag = new ComputedBag<TContext>(this)
        return control
    }
}