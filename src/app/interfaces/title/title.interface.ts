export interface InnerItem {
  id: number;
  title: string;
  answer?: string;
  item?: Object[];
}

export interface Title {
  id?: number;
  title?: string;
  item?: InnerItem[];
}
