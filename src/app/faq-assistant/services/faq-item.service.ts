import {Injectable} from '@angular/core';
import {FaqItemContentInterface, FaqObject} from '../interfaces/faq-item.interface';

@Injectable()
export class FaqItemListService {
  pipeline: object[] = [];
  currentObjectConfig: FaqItemContentInterface<FaqObject>;

  constructor() {

  }

  setPipeLineItem(itemList: FaqObject | FaqItemContentInterface<FaqObject>): void {
    this.pipeline.push(itemList);
  }

  getLastItem() {
    return this.pipeline[this.pipeline.length - 1];
  }

  getItems(): object[] {
    return this.pipeline;
  }

  getItemsById(property): FaqItemContentInterface<FaqObject> {
    const contentList = {};

    for (let i = 0; i < property.content.length; i++) {
      contentList[i] = this.currentObjectConfig[property.content[i]];
    }

    return contentList;
  }

  setInitialStateData(object: FaqItemContentInterface<FaqObject>) {
    this.currentObjectConfig = object;
  }

  getInitialStateData(): FaqItemContentInterface<FaqObject> {
    return this.currentObjectConfig;
  }

  removeLastItem(): void {
    this.pipeline.splice(-1, 1);
  }
}
