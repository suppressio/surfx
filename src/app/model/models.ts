
export interface FileData {
    fileContent: any|undefined,
    fileName: string|undefined,
    isXml?: true;
    isJson?: true;
    error?: string
}

/** Node for to-do item */
export class ItemNode {
    children: ItemNode[] = [];
    item!: string;
}
/** Flat to-do item node with expandable and level information */
export class ItemFlatNode {
    item!: string;
    level!: number;
    expandable: boolean = false;
}
  