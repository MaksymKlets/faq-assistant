import {Injectable} from '@angular/core';
import {FaqItemContentInterface} from '../interfaces/faq-item.interface';

@Injectable()
export class FaqItemListService {
  pipeline: FaqItemContentInterface[][] = [];

  constructor() {
  }

  setItem(itemList: FaqItemContentInterface[]): void {
    this.pipeline.push(itemList);
  }

  getLastItem(): FaqItemContentInterface[] {
    return this.pipeline[this.pipeline.length - 1];
  }

  getItems(): FaqItemContentInterface[][] {
    return this.pipeline;
  }

  removeLastItem(): void {
    this.pipeline.splice(-1, 1);
  }
}
