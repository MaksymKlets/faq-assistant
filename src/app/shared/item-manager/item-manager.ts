import { FaqItem } from '../faqItem/faqItem.interface';

export class ItemManager {
  pipeline = [];

  constructor() { }

  setItem(item: FaqItem[]): void {
    this.pipeline.push(item);
  }

  getLastItem(): FaqItem[] {
    return this.pipeline[this.pipeline.length - 1];
  }

  getItems(): FaqItem[] {
    return this.pipeline;
  }

  removeLastItem(): void {
    this.pipeline.splice(-1, 1);
  }

}
