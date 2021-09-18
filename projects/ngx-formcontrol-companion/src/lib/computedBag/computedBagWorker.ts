import { AbstractControl, FormGroup } from "@angular/forms";
import { iterateAllChildControls } from "../utilities";
import { ComputedBagConfig } from "./ComputedBagConfig";
import { ComputeContext } from "./ComputeContext";

type keyValuePair = { [key: string]: any }

async function compute<T extends ComputeContext>(control: AbstractControl, context: T, path: string): Promise<keyValuePair> {
    const computedConfig = (control as any).computedBag.config as ComputedBagConfig<T>
    const result: keyValuePair = {}

    for (const [key, f] of Object.entries(computedConfig.items)) {
        result[key] = await f(context, path)
    }

    return result
}

export async function updateAllComputedBags<T extends ComputeContext>(root: FormGroup, context: T): Promise<void> {
    for (const [p, c] of iterateAllChildControls(root)) {
        const computedBag = (c as any).computedBag
        if (!computedBag) {
            continue
        }

        computedBag.result = await compute(c, context, p)
    }
}
