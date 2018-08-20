import {FaqItemListInterface} from '../interfaces/faq-item.interface';
import {Injectable} from '@angular/core';

@Injectable()
export class FaqItemListService {
  pipeline: FaqItemListInterface[][] = [];

  constructor() {
  }

  setItem(itemList: FaqItemListInterface[]): void {
    this.pipeline.push(itemList);
  }

  getLastItem(): FaqItemListInterface[] {
    return this.pipeline[this.pipeline.length - 1];
  }

  getItems(): FaqItemListInterface[][] {
    return this.pipeline;
  }

  removeLastItem(): void {
    this.pipeline.splice(-1, 1);
  }
}
