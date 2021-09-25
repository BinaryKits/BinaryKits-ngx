import { Injectable } from "@angular/core";
import { AbstractControl, FormArray, FormControl, FormGroup } from "@angular/forms";
import { iterateAllControls } from "@binarykits/ngx-formcontrol-companion";

export const symbols = { errorCount: Symbol("errorCount") }

@Injectable()
export class ErrorCounterService {
    
    updateErrorCounts(node: FormGroup | FormArray): number {
        // Set all to 0
        if (!node.invalid) {
            this.clearErrorCounts(node)
            return 0
        }

        // Count total
        let total = 0

        for (const [_, c] of Object.entries(node.controls)) {
            
            if (c instanceof FormControl) {
                if (c.invalid) {
                    total += 1
                }
                continue
            }
            
            if (c instanceof FormGroup || c instanceof FormArray) {
                total += this.updateErrorCounts(c)
            }
        }

        this.setErrorCount(node, total)
        return total
    }

    // Recursively set error count to 0, check node invalid before using
    clearErrorCounts(node: FormGroup | FormArray) {
        this.setErrorCount(node, 0)

        for (const [_, c] of Object.entries(node.controls)) {
            if (c instanceof FormGroup || c instanceof FormArray) {
                this.clearErrorCounts(c)
            } 
        }
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
                    result[p.toString()] = c.errors
                } else if (c instanceof FormGroup || c instanceof FormArray) {
                    result[p.toString()] = this.query(c)
                }
            }
        }

        return result
    }
}