import { FormGroup } from "@angular/forms";
import { iterateAllChildControls } from "../iterateAllChildControls";
import { ComputedBagConfig } from "./ComputedBagConfig";
import { ComputedBagContext } from "./ComputedBagContext";

type keyValuePair = { [key: string]: any }

function compute(config: ComputedBagConfig, context: ComputedBagContext, path: string): keyValuePair | undefined {
    const result: keyValuePair = {}

    for (const [key, f] of Object.entries(config.items)) {
        result[key] = f(context, path)
    }

    return result
}

export function updateAllComputedBags(root: FormGroup, context: ComputedBagContext): void {
    for (const [p, c] of iterateAllChildControls(root)) {
        const computedConfig = (c as any).computedBagConfig as ComputedBagConfig
        if (!computedConfig) {
            continue
        }

        (c as any).computedBag = compute(computedConfig, context, p)
    }
}
