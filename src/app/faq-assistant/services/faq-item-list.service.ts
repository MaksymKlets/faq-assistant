import {Injectable} from '@angular/core';

@Injectable()
export class FaqItemListService {
  queueList: number[] = [];

  constructor() {
  }

  setQueueItem(index: number): void {
    this.queueList.push(index);
  }

  getLastQueueItem(): number[] {
    const lastItem = [];
    lastItem.push(this.queueList[this.queueList.length - 1] || undefined);
    return lastItem;
  }

  removeLastQueueItem(): void {
    this.queueList.splice(-1, 1);
  }
}
