export interface Dictionary<T> {
  [index: number]: T;
}

export interface FaqItem {
  title?: string;
  content?: string | object;
}
