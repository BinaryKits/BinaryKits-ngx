import { ComputeContext } from "./ComputeContext";
import { BackpackConfig } from "./BackpackConfig";
import { keyValuePair } from "./helpers";

// Attached to AbstractControl
export class BackpackContainer<T extends ComputeContext> {
    public computedProperties: keyValuePair = {}  // Result after run

    constructor(public config: BackpackConfig<T>) {
    }
}