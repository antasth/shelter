export interface LevelObject {
    id: number;
    name: string;
    type: string;
    description: string;
    example: string;
    task: string;
    html: Array<LevelElement>;
}

export interface LevelElement {
    tag: string;
    class?: string;
    id?: string;
    child?: string;
    childClass?: string;
    childId?: string;
}
