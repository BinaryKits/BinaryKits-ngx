import { FormArray, FormControl, FormGroup } from "@angular/forms";

// Visit all the child controls
export function* iterateAllChildControls(root: FormGroup) {
    function* f(node: FormGroup | FormArray, path: string): any {
        const delimiter = path ? "." : ""

        for (const [key, c] of Object.entries(node.controls)) {
            const p = node instanceof FormGroup ? `${path}${delimiter}${key}` : `${path}[${key}]`

            if (c instanceof FormControl) {
                yield [p, c]
            } else if (c instanceof FormGroup || c instanceof FormArray) {
                yield* f(c, p)
            }
        }
    }

    yield* f(root, "")
}

