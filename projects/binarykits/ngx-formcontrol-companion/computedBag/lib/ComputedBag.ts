import { ComputedBagConfig } from "./ComputedBagConfig";
import { keyValuePair } from "./KeyValuePair";

export class ComputedBag<TContext> {
    public result: keyValuePair = {}

    constructor(public config: ComputedBagConfig<TContext>) {
    }
}