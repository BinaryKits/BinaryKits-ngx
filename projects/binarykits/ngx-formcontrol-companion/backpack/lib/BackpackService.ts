import { Injectable } from "@angular/core";
import { AbstractControl, FormArray, FormControl, FormGroup } from "@angular/forms";
import { iterateAllControls } from "@binarykits/ngx-formcontrol-companion/utilities";
import { BackpackContainer } from "./BackpackContainer";
import { ComputContextFactory, ComputeContext } from "./ComputeContext";
import { keyValuePair, ATTACH_POINT } from "./helpers";

export class BackpackService {
    // Should not have any member, almost static

    recursivelyDisable(root: FormGroup | FormArray) {
        if (this.queryComputed(root, "isDisabled")) {
            root.disable({ emitEvent: false })
            return
        }

        for (const [key, c] of Object.entries(root.controls)) {
            if (this.queryComputed(c, "isDisabled")) {
                c.disable({ emitEvent: false })  // FormGroup/Array child will be disabled
                continue
            }

            // Check the children
            if (c instanceof FormGroup || c instanceof FormArray) {
                this.recursivelyDisable(c)
            }
        }
    }

    async updateComputedProperties<T extends ComputeContext>(contextFactory: ComputContextFactory<T>): Promise<keyValuePair> {
        const context = contextFactory()
        const result: keyValuePair = {}

        for (const [p, c] of iterateAllControls(context.root)) {
            const backpack = this.retrieve<T>(c)
            if (!backpack) {
                continue
            }

            backpack.computedProperties = await this.compute(c, context, p, backpack)
            result[p] = backpack.computedProperties
        }

        return result
    }

    retrieve<T extends ComputeContext>(control: AbstractControl): BackpackContainer<T> {
        return (control as any)[ATTACH_POINT] as BackpackContainer<T>
    }
    
    queryComputed<T extends ComputeContext>(control: AbstractControl, property: string): any {
        const backpack = this.retrieve<T>(control)
        if (!backpack) {
            return undefined
        }
    
        return backpack.computedProperties[property]
    }

    private async compute<T extends ComputeContext>(control: AbstractControl, context: T, path: string, backpack: BackpackContainer<T>): Promise<keyValuePair> {
        const result: keyValuePair = {}

        for (const [key, f] of Object.entries(backpack.config.computedPropertyLogics)) {
            result[key] = await f(context, control, path)
        }

        return result
    }
}