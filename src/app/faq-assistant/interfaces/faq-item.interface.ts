export interface Dictionary<T> {
  [index: string]: T;
}

export interface FaqItem {
  title?: string;
  content?: string | number[];
}
