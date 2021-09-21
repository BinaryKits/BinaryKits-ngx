import { AbstractControl, FormArray, FormGroup } from "@angular/forms";
import { iterateAllControls } from "@binarykits/ngx-formcontrol-companion/utilities";
import { BackpackContainer } from "./BackpackContainer";
import { ComputContextFactory, ComputeContext } from "./ComputeContext";
import { ControlContext } from "./ControlContext";
import { keyValuePair, symbols } from "./helpers";

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

        for (const [p, c] of iterateAllControls(context.root)) {
            const backpack = this.retrieve<T>(c)
            if (!backpack) {
                continue
            }

            backpack.computedProperties = {}  // Reset
            context.result[p] = backpack.computedProperties
            
            // Compute each logic
            const localContext = new ControlContext<T>(p, c, context)
            for (const [propertyName, f] of Object.entries(backpack.config.computedPropertyLogics)) {
                backpack.computedProperties[propertyName] = await f(localContext)
            }
        }

        return context
    }

    retrieve<T extends ComputeContext>(control: AbstractControl): BackpackContainer<T> | undefined {
        if (!control) {
            return undefined
        }
        
        return (control as any)[symbols.backpack] as BackpackContainer<T>
    }
    
    queryComputed<T extends ComputeContext>(control: AbstractControl, property: string): any {
        const backpack = this.retrieve<T>(control)
        if (!backpack) {
            return undefined
        }
    
        return backpack.computedProperties[property]
    }
}