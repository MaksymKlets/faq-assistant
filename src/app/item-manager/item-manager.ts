import { Title } from '../interfaces/title/title.interface';

export class ItemManager {
  pipeline = [];

  constructor() {

  }

  setItem(item: Title[]): void {
    this.pipeline.push(item);
  }

  getLastItem(): Title[] {
    return this.pipeline[this.pipeline.length - 1];
  }

  getItems(): Title[] {
    return this.pipeline;
  }

  removeLastItem(): void {
    this.pipeline.splice(-1, 1);
  }

}
