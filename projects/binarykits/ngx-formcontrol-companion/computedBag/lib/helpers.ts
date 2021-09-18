import { AbstractControl, FormGroup } from "@angular/forms";
import { iterateAllChildControls } from "@binarykits/ngx-formcontrol-companion/utilities";
import { ComputeContext } from "./ComputeContext";
import { ComputedBagConfig } from "./ComputedBagConfig";

type keyValuePair = { [key: string]: any }

async function compute<T extends ComputeContext>(control: AbstractControl, context: T, path: string): Promise<keyValuePair> {
    const computedConfig = (control as any).computedBag.config as ComputedBagConfig<T>
    const result: keyValuePair = {}

    for (const [key, f] of Object.entries(computedConfig.items)) {
        result[key] = await f(context, control, path)
    }

    return result
}

export async function updateAllBags<T extends ComputeContext>(context: T): Promise<void> {
    for (const [p, c] of iterateAllChildControls(context.root)) {
        const computedBag = (c as any).computedBag
        if (!computedBag) {
            continue
        }

        computedBag.result = await compute(c, context, p)
    }
}

export function updateControlDisableStatus(root: FormGroup) {
    for (const [p, c] of iterateAllChildControls(root)) {
        const cs = c as any
        if (cs.computedBag && cs.computedBag.result.isDisabled) {
            c.disable({ emitEvent: false })
        }
    }
}

