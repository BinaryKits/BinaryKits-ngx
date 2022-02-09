import { Injectable } from "@angular/core";
import { AbstractControl, FormArray, FormGroup } from "@angular/forms";
import { iterateAllControls } from "@binarykits/ngx-form-kit";
import { BackpackContainer } from "./BackpackContainer";
import { ComputContextFactory, ComputeContext } from "./ComputeContext";
import { ControlContext } from "./ControlContext";
import { keyValuePair, symbols } from "./helpers";


const noEmit = { emitEvent: false }

@Injectable()
export class BackpackService {

    recursivelyUpdateDisableStatus(root: FormGroup | FormArray) {
        if (this.queryComputed(root, "isDisabled")) {
            root.disable(noEmit)  // FormGroup/Array children will be disabled
            return
        }
        
        if (root.disabled) {
            root.enable(noEmit) // Clear disabled for children
        }

        for (const [key, c] of Object.entries(root.controls)) {
            if (this.queryComputed(c, "isDisabled")) {
                c.disable(noEmit)  // FormGroup/Array children will be disabled
                continue
            }
            
            if (c.disabled) {
                c.enable(noEmit) // Clear disabled children
            }

            // Check the children
            if (c instanceof FormGroup || c instanceof FormArray) {
                this.recursivelyUpdateDisableStatus(c)
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
            context.result[p.toString()] = backpack.computedProperties
            
            // Compute each logic
            const localContext = new ControlContext<T>(p, c, context)
            for (const [propertyName, f] of Object.entries(backpack.config.computedPropertyLogics)) {
                backpack.computedProperties[propertyName] = await f(localContext)
            }
        }

        return context
    }

    retrieve<T extends ComputeContext>(control: AbstractControl): BackpackContainer<T> {
        return (control as any)[symbols.backpack] as BackpackContainer<T>
    }
    
    queryComputed<T extends ComputeContext>(control: AbstractControl, property: string): any {
        const backpack = this.retrieve<T>(control)
        if (!backpack) {
            return undefined
        }
    
        return backpack.computedProperties[property]
    }

    setComputed<T extends ComputeContext>(control: AbstractControl, property: string, value: any): void {
        const backpack = this.retrieve<T>(control)
        if (!backpack) {
            return undefined
        }

        backpack.computedProperties[property] = value
    }
}