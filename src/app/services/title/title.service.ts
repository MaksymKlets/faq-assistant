import { Injectable } from '@angular/core';
import { TitleList } from '../../mock/mock-title';
import { Title } from '../../interfaces/title/title.interface';

@Injectable()

export class TitleService {
  constructor() { }

  getTitleList(): Title[] {
    return TitleList;
  }
}
