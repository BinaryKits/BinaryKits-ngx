import { ComputeContext } from "./ComputeContext";
import { ComputedPropertiesConfig } from "./ComputedPropertiesConfig";
import { keyValuePair } from "./helpers";

// Attached to AbstractControl
export class BackpackContainer<T extends ComputeContext> {
    public computedProperties: keyValuePair = {}  // Result after run

    constructor(public computedPropertiesConfig: ComputedPropertiesConfig<T>) {
    }
}