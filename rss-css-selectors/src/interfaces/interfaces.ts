export interface LevelObject {
    id: number;
    name: string;
    type: string;
    description: string;
    example: string;
    task: string;
    html: Array<LevelElement>;
    htmlContent: Array<string | string[]>;
    answer: string;
}

export interface LevelElement {
    tag: string;
    class?: string;
    id?: string;
    child?: string;
    childClass?: string;
    childId?: string;
}

export interface GameData {
    completedLevels: Array<CompletedLevelObject>;
}
interface CompletedLevelObject {
    level: number;
    help: boolean;
}
