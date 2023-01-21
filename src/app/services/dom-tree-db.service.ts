import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ItemNode } from "../model/models";

/**
 * Dom Tree Database: it can build a tree structured Json object.
 * Each node in Json object represents a item or a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
@Injectable()
export class DomTreeDatabase {
  dataChange = new BehaviorSubject<ItemNode[]>([]);

  get data(): ItemNode[] {
    return this.dataChange.value;
  }

  set data(newData: ItemNode[]){
    this.initialize(newData, 0);
  }

  constructor() { }

  initialize(obj: {[key: string]: any}, level: number) {
    // Build the tree nodes from Json object. 
    // The result is a list of `TodoItemNode` with nested file node as children.
    const data = this.buildFileTree(obj, level);

    // Notify the change.
    this.dataChange.next(data);
  }

  /** Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `TodoItemNode`. */
  buildFileTree(obj: {[key: string]: any}, level: number): ItemNode[] {
    return Object.keys(obj).reduce<ItemNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new ItemNode();
      node.item = key;

      if (value != null) {
        if (typeof value === 'object')
          node.children = this.buildFileTree(value, level + 1);
        else
          node.item = value;
      }

      return accumulator.concat(node);
    }, []);
  }

  /** Add an item to to-do list */
  insertItem(parent: ItemNode, name: string) {
    if (parent.children) {
      parent.children.push({item: name} as ItemNode);
      this.dataChange.next(this.data);
    }
  }

  updateItem(node: ItemNode, name: string) {
    node.item = name;
    this.dataChange.next(this.data);
  }
}