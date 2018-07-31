export interface InnerItem {
  title: string;
  answer: string;
  item: Object[];
}

export interface FaqItem {
  title: string;
  answer: string;
  item: InnerItem[];
}
