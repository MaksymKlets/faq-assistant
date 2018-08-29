import {Injectable} from '@angular/core';

@Injectable()
export class FaqItemListService {
  queueList: number[] = [];

  constructor() {
  }

  setQueueItem(index: number): void {
    this.queueList.push(index);
  }

  getLastQueueItem(): number | null {
    if (!this.queueList.length) {
      return null;
    }

    return this.queueList[this.queueList.length - 1];
  }

  removeLastQueueItem(): void {
    this.queueList.splice(-1, 1);
  }
}
