import { AbstractControl, FormArray, FormControl, FormGroup } from "@angular/forms";
import { AbstractControlPath } from "./AbstractControlPath";

// Iterate all the nested child controls in FormGroup
export function* iterateAllControls(root: FormGroup): Generator<[AbstractControlPath, AbstractControl], void, undefined> {
    function* f(path: AbstractControlPath, node: FormGroup | FormArray): Generator<[AbstractControlPath, AbstractControl], void, undefined> {
        yield [path, node]

        for (const [key, c] of Object.entries(node.controls)) {
            if (c instanceof FormControl) {
                yield [path.child(key), c]
            } else if (c instanceof FormGroup || c instanceof FormArray) {
                yield* f(path.child(key), c)
            } else {
                throw Error("Not supported control type: " + c.constructor.name)
            }
        }

        return
    }

    yield* f(new AbstractControlPath([]), root)
}

