import { AbstractControl, FormArray, FormControl, FormGroup } from "@angular/forms";
import { iterateAllChildControls } from "@binarykits/ngx-formcontrol-companion/utilities";
import { ComputContextFactory, ComputeContext } from "./ComputeContext";
import { ComputedBagConfig } from "./ComputedBagConfig";
import { keyValuePair } from "./types/KeyValuePair";

export class ComputeRunner<T extends ComputeContext> {
    constructor(public contextFactory: ComputContextFactory<T>) {

    }

    recursivelyDisable(root: FormGroup | FormArray) {
        for (const [key, c] of Object.entries(root.controls)) {
            const g = c as any
            if (g.computedBag && g.computedBag.result.isDisabled) {
                c.disable({ emitEvent: false })  // FormGroup/Array child will be disabled
                continue
            }

            // Check the children
            if (c instanceof FormControl) {
                continue
            }

            if (c instanceof FormGroup || c instanceof FormArray) {
                this.recursivelyDisable(c)
            }
        }
    }

    async updateAll(): Promise<keyValuePair> {
        const context = this.contextFactory()
        const result: keyValuePair = {}

        for (const [p, c] of iterateAllChildControls(context.root)) {
            const computedBag = (c as any).computedBag
            if (!computedBag) {
                continue
            }

            computedBag.result = await this.compute(c, context, p)
            result[p] = computedBag.result
        }

        return result
    }

    private async compute(control: AbstractControl, context: T, path: string): Promise<keyValuePair> {
        const computedConfig = (control as any).computedBag.config as ComputedBagConfig<T>
        const result: keyValuePair = {}

        for (const [key, f] of Object.entries(computedConfig.items)) {
            result[key] = await f(context, control, path)
        }

        return result
    }
}