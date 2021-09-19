import { ComputeContext } from "./ComputeContext";
import { ComputedBagConfig } from "./ComputedBagConfig";
import { keyValuePair } from "./types/KeyValuePair";

export class ComputedBag<T extends ComputeContext> {
    public result: keyValuePair = {}

    constructor(public config: ComputedBagConfig<T>) {
    }
}