import { Component, OnInit, Input } from '@angular/core';
import { TitleService } from '../../services/title/title.service';
import { Title } from '../../interfaces/title/title.interface';
import { ItemManager } from '../../item-manager/item-manager';

@Component({
  selector: 'app-faq-assistant',
  templateUrl: './faq-assistant.component.html',
  styleUrls: ['./faq-assistant.component.scss']
})
export class FaqAssistantComponent implements OnInit {

  titleList: Title[];
  answer: string;
  items: Title[];
  showFinish = false;
  lastStep: boolean;
  showBack = false;

  constructor(private titleService: TitleService, private itemManager: ItemManager) { }

  @Input() customClass: string;

  getTitleList(): void {
    this.titleList = this.titleService.getTitleList();
    this.itemManager.setItem(this.titleList);
  }

  setTitle(title: Title[], answer: string): void {
    if (Array.isArray(title)) {
      this.itemManager.setItem(title);
      this.titleList = title;
      this.showBack = true;
    } else {
      this.answer = answer;
      this.showFinish = true;
      this.showBack = true;
      this.lastStep = true;
    }
  }

  back(): void {
    // remove current step and get previous
    if (!this.lastStep) {
      this.itemManager.removeLastItem();
    }
    this.titleList = this.itemManager.getLastItem();

    this.items = this.itemManager.getItems();

    // hide back button if first step
    if (this.items.length === 1) {
      this.showBack = false;
    }

    // Show titles if not last step
    if (this.lastStep) {
      this.showFinish = false;
      this.lastStep = false;
    }
  }

  ngOnInit() {
    this.getTitleList();
  }
}
