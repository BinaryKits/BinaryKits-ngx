import { ComputedBagContext } from "./ComputedBagContext"

type Configs = { [key: string]: (context: ComputedBagContext, path: string) => any }

export class ComputedBagConfig {

    constructor(public source: string, public items: Configs) {
    }
}