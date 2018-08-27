export interface FaqItemContentInterface<T> {
  [index: number]: T;
}

export interface FaqObject {
  title: string;
  content: string | object;
}
