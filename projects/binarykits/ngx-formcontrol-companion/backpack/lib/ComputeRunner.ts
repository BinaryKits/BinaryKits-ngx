import { AbstractControl, FormArray, FormControl, FormGroup } from "@angular/forms";
import { iterateAllControls } from "@binarykits/ngx-formcontrol-companion/utilities";
import { BackpackContainer } from "./BackpackContainer";
import { ComputContextFactory, ComputeContext } from "./ComputeContext";
import { getBackpack, keyValuePair, queryComputed } from "./helpers";

export class ComputeRunner<T extends ComputeContext> {
    constructor(public contextFactory: ComputContextFactory<T>) {

    }

    recursivelyDisable(root: FormGroup | FormArray) {
        if (queryComputed(root, "isDisabled")) {
            root.disable({ emitEvent: false })
            return
        }

        for (const [key, c] of Object.entries(root.controls)) {
            if (queryComputed(c, "isDisabled")) {
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

        for (const [p, c] of iterateAllControls(context.root)) {
            const backpack = getBackpack<T>(c)
            if (!backpack) {
                continue
            }

            backpack.computedProperties = await this.compute(c, context, p, backpack)
            result[p] = backpack.computedProperties
        }

        return result
    }

    private async compute(control: AbstractControl, context: T, path: string, backpack: BackpackContainer<T>): Promise<keyValuePair> {
        const result: keyValuePair = {}

        for (const [key, f] of Object.entries(backpack.config.computedPropertyLogics)) {
            result[key] = await f(context, control, path)
        }

        return result
    }
}