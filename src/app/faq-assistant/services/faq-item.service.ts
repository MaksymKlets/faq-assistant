import {Injectable} from '@angular/core';
import {FaqItemContentInterface} from '../interfaces/faq-item.interface';

@Injectable()
export class FaqItemListService {
  pipeline: Array<object> = [];
  currentObjectConfig: object;

  constructor() {
  }

  setPipeLineItem(itemList: object): void {
    this.pipeline.push(itemList);
  }

  getLastItem() {
    return this.pipeline[this.pipeline.length - 1];
  }

  getItems(): Array<object> {
    return this.pipeline;
  }

  getItemsById(property) {
    const contentList = {};

    for (let i = 0; i < property.length; i++) {
      contentList[i] = this.currentObjectConfig[property[i]];
    }

    return contentList;
  }

  setInitialStateData(object) {
    this.currentObjectConfig = object;
  }

  getInitialStateData() {
    return this.currentObjectConfig;
  }

  removeLastItem(): void {
    this.pipeline.splice(-1, 1);
  }
}
