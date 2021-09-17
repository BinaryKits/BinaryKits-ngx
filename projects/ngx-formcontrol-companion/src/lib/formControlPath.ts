export class FormControlPath {
    readonly path: string

    constructor(path: string) {
        this.path = path
    }

    get hasParent(): boolean {
        return this.path.indexOf('.') > -1;
    }

    // "a.b[3]" => "a.b"
    get arrayRoot(): FormControlPath {
        const pos = this.path.lastIndexOf('[')  // No check
        return new FormControlPath(this.path.substring(0, pos))
    }

    // "a.b[3]" => "3"
    get arrayIndex(): number {
        const pos = this.path.lastIndexOf('[')  // No check
        return +this.path.slice(pos + 1, -1)
    }

    get isArray(): boolean {
        return this.path.endsWith(']')
    }

    // "a.b[0].c" => "c"
    get childName() {
        const pos = this.path.lastIndexOf('.') + 1;
        return this.path.substring(pos, this.path.length - 1);
    }

    // "a.b.c" => "a.b"
    parent(level?: number): FormControlPath {
        if (level && level > 1) {
            return new FormControlPath(this.path.split('.').slice(0, -level).join('.'))
        } else {
            const pos = this.path.lastIndexOf('.')  // No check
            return new FormControlPath(this.path.substring(0, pos))
        }
    }

    // "a.b" => "a.b.childName"
    child(childName: string): FormControlPath {
        return new FormControlPath(this.path + '.' + childName)
    }

    // "a.b" => "a.siblingName"
    sibling(siblingName: string): FormControlPath {
        const pos = this.path.lastIndexOf('.')
        return new FormControlPath(this.path.substring(0, pos + 1) + siblingName)
    }
    // "a.b" => "a.siblingName"
    siblingByTail(siblingName: string): FormControlPath {
        const pos = this.path.lastIndexOf('.')
        return new FormControlPath(this.path.substring(0, pos + 1) + siblingName.split(".").slice(-1)[0])
    }

    // "a.b" with index = 3 => "a.b[3]"
    childByIndex(index: number) {
        return new FormControlPath(`${this.path}[${index}]`)
    }

    toString(): string {
        return this.path
    }
}

