import {Injectable} from '@angular/core';
import {
  Dictionary,
  FaqItem
} from '../interfaces/faq-item.interface';

@Injectable()
export class FaqItemListService {
  queueList: FaqItem[] = [];
  initialTitleList: Dictionary<FaqItem>;

  constructor() {
  }

  setQueueItem(itemList: FaqItem | Dictionary<FaqItem>): void {
    this.queueList.push(itemList);
  }

  getLastQueueItem(): FaqItem {
    return this.queueList[this.queueList.length - 1];
  }

  getQueueList(): FaqItem[] {
    return this.queueList;
  }

  getTitleById(currentTitle: FaqItem): Dictionary<FaqItem> {
    const titleList = {};
    const content = currentTitle.content as number[];

    for (let i = 0; i < content.length; i++) {
      titleList[currentTitle.content[i]] = this.initialTitleList[currentTitle.content[i]];
    }

    return titleList;
  }

  setInitialStateData(object: Dictionary<FaqItem>): void {
    this.initialTitleList = object;
  }

  removeLastQueueItem(): void {
    this.queueList.splice(-1, 1);
  }
}
