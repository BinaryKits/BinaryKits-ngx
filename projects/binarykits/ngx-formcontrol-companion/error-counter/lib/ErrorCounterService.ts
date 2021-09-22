import { Injectable } from "@angular/core";
import { AbstractControl, FormArray, FormControl, FormGroup } from "@angular/forms";
import { iterateAllControls } from "@binarykits/ngx-formcontrol-companion/utilities";

export const symbols = { errorCount: Symbol("errorCount") }

@Injectable()
export class ErrorCounterService {
    
    updateErrorCounts(node: FormGroup | FormArray): number {
        let total = 0

        for (const [key, c] of Object.entries(node.controls)) {
            if (!c.invalid) {
                continue
            }
            
            if (c instanceof FormControl) {
                total += 1
                continue
            } else if (c instanceof FormGroup || c instanceof FormArray) {
                total += this.updateErrorCounts(c)
            }
        }

        this.setErrorCount(node, total)
        return total
    }

    setErrorCount(control: FormGroup | FormArray, count: number) {
        (control as any)[symbols.errorCount] = count
    }

    query(control: AbstractControl) {
        if (control instanceof FormControl) {
            return null
        }

        const count = (control as any)[symbols.errorCount]
        if (!count) {
            return 0
        }

        return count
    }

    getErrorReport(root: FormGroup) : any {
        const result:any = {}
        
        for (const [p, c] of iterateAllControls(root)) {
            if (c.invalid) {
                if (c instanceof FormControl) {
                    result[p] = c.errors
                } else if (c instanceof FormGroup) {
                    result[p] = "[FormGroup]"
                }
                else if (c instanceof FormArray) {
                    result[p] = "[FormArray]"
                }
            }
        }

        return result
    }
}