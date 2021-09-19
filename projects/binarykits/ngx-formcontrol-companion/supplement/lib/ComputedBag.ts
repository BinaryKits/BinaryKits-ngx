import { ComputeContext } from "./ComputeContext";
import { ComputedBagConfig } from "./ComputedBagConfig";
import { keyValuePair } from "./helpers";

export class ComputedBag<T extends ComputeContext> {
    public computedProperties: keyValuePair = {}  // Result after run

    constructor(public config: ComputedBagConfig<T>) {
    }
}