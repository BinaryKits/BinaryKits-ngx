import { AbstractControl } from "@angular/forms"

type computeLogic<TContext> = (context: TContext, control: AbstractControl, path: string) => Promise<any>

export class ComputedBagConfig<TContext> {

    constructor(public items: { [key: string]: computeLogic<TContext> }) {
    }

    public attachTo<T>(control: AbstractControl): AbstractControl {
        (control as any).computedBag = { config: this }
        return control
    }
}