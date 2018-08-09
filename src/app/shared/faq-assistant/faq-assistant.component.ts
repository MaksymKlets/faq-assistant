import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  ViewEncapsulation

} from '@angular/core';
import { FaqItem } from '../faqItem/faqItem.interface';
import { ItemManager } from '../item-manager/item-manager';

@Component({
  selector: 'app-faq-assistant',
  templateUrl: './faq-assistant.component.html',
  styleUrls: ['./faq-assistant.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FaqAssistantComponent implements OnInit {

  titleList: FaqItem[];
  items: FaqItem[];
  showFinish = false;
  lastStep: boolean;
  showBack = false;
  answer: string;
  componentRef: any;

  @Input() customClass: string;
  @Input() data: FaqItem[];
  @ViewChild('finalanswer', { read: ViewContainerRef }) entry: ViewContainerRef;

  public constructor(
              private itemManager: ItemManager,
              private viewContainerRef: ViewContainerRef,
              private resolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    this.getTitleList();
  }

  createComponent(answer: any): void {
    this.entry.clear();
    const factory = this.resolver.resolveComponentFactory(answer);
    this.componentRef = this.entry.createComponent(factory);
  }

  getTitleList(): void {
    this.titleList = this.data;
    console.log(this.titleList);
    this.itemManager.setItem(this.titleList);
  }

  clearDataComponent (): void {
    if (this.entry) {
      this.entry.clear();
    }
    this.answer = '';
  }

  setTitle(title: FaqItem[], answer: string): void {
    if (Array.isArray(title)) {
      this.itemManager.setItem(title);
      this.titleList = title;
      this.showBack = true;
      this.answer = answer;
    } else {
      this.showFinish = true;
      this.showBack = true;
      this.lastStep = true;

      if (typeof answer === 'function') {
        this.createComponent(answer);
      } else {
        this.answer = answer;
      }
    }
  }

  back(): void {

    this.clearDataComponent();

    if (this.lastStep) {
      this.showFinish = false;
      this.lastStep = false;
    } else {
      this.itemManager.removeLastItem();
    }

    this.titleList = this.itemManager.getLastItem();

    this.items = this.itemManager.getItems();

    if (this.items.length === 1) {
      this.showBack = false;
    }
  }
}
