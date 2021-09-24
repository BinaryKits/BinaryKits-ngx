export class AbstractControlPath {
    readonly path: Array<string | number>

    constructor(path: Array<string | number> | string) {
        if (!Array.isArray(path)) {
            path = path.split(".");
        }

        this.path = path
    }

    // "a.b.c" => "a.b"
    parent(level: number = 1): AbstractControlPath {
        const s = this.path.slice(0, -level)
        return new AbstractControlPath(s)
    }

    // "a.b" => "a.b.c.d"
    child(childPath: Array<string | number> | string): AbstractControlPath {
        if (!Array.isArray(childPath)) {
            childPath = childPath.split(".");
        }

        return new AbstractControlPath(this.path.concat(childPath))
    }

    // "a.b" => "a.siblingName"
    sibling(siblingName: string): AbstractControlPath {
        return new AbstractControlPath([...this.path.slice(0, -1), siblingName])
    }

    toString(): string {
        return this.path.join(".")
    }
}