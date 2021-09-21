import { AbstractControl } from "@angular/forms"
import { ComputeContext } from ".."
import { BackpackContainer } from "./BackpackContainer"

const ATTACH_POINT = Symbol("backpack")

export type keyValuePair = { [key: string]: any }

export function getBackpack<T extends ComputeContext>(control: AbstractControl): BackpackContainer<T> {
    return (control as any)[ATTACH_POINT] as BackpackContainer<T>
}

export function queryComputed<T extends ComputeContext>(control: AbstractControl, property: string): any {
    const backpack = getBackpack<T>(control)
    if (!backpack) {
        return undefined
    }

    return backpack.computedProperties[property]
}