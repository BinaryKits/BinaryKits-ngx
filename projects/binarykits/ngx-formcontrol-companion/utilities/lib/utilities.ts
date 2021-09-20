import { AbstractControl, FormArray, FormControl, FormGroup } from "@angular/forms";

// Iterate all the nested child controls in FormGroup
export function* iterateAllControls(root: FormGroup): Generator<[string, AbstractControl], void, undefined> {
    function* f(path: string, node: FormGroup | FormArray): Generator<[string, AbstractControl], void, undefined> {
        yield [path, node]

        const delimiter = path ? "." : ""

        for (const [key, c] of Object.entries(node.controls)) {
            const p = node instanceof FormGroup ? `${path}${delimiter}${key}` : `${path}[${key}]`

            if (c instanceof FormControl) {
                yield [p, c]
            } else if (c instanceof FormGroup || c instanceof FormArray) {
                yield* f(p, c)
            } else {
                throw Error("Not supported control type: " + c.constructor.name)
            }
        }

        return
    }

    yield* f("", root)
}

