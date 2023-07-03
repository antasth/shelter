export interface LevelObject {
    id: number;
    name: string;
    type: string;
    description: string;
    example: string;
    task: string;
    html: Array<LevelElement>;
    htmlContent: Array<string>;
    target: number[];
    answer: string[];
}

export interface LevelElement {
    tag: string;
    class?: string[];
    id?: string;
    child?: string;
    childClass?: string;
    childId?: string;
    index: string;
    childIndex?: string;
    tooltip: string;
    childTooltip?: string;
}

export interface GameData {
    currentLevel: number;
    writeAnswerDelay: number;
    completedLevels: Array<CompletedLevelObject>;
}
export interface CompletedLevelObject {
    level: number;
    help: boolean;
}
