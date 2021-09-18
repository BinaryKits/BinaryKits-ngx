import { AbstractControl, FormGroup } from "@angular/forms";
import { iterateAllChildControls } from "./utilities";
import { ComputedBagConfig } from "./ComputedBagConfig";

export function updateControlDisableStatus(root: FormGroup) {
    for (const [p, c] of iterateAllChildControls(root)) {
        const cs = c as any
        if (cs.computedBag && cs.computedBag.result.isDisabled) {
            c.disable({ emitEvent: false })
        }
    }
}
