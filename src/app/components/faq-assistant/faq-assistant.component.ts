import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver

} from '@angular/core';
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
  items: Title[];
  showFinish = false;
  lastStep: boolean;
  showBack = false;
  answer: string;
  componentRef: any;

  public constructor(private titleService: TitleService,
              private itemManager: ItemManager,
              private viewContainerRef: ViewContainerRef,
              private resolver: ComponentFactoryResolver
  ) { }

  @Input() customClass: string;

  @ViewChild('finalanswer', { read: ViewContainerRef }) entry: ViewContainerRef;

  createComponent(answer) {
    this.entry.clear();
    const factory = this.resolver.resolveComponentFactory(answer);
    this.componentRef = this.entry.createComponent(factory);
    this.componentRef.instance.data = 'some data';
  }

  getTitleList(): void {
    this.titleList = this.titleService.getTitleList();
    this.itemManager.setItem(this.titleList);
  }

  clearDataComponent (): void {
    this.entry.clear();
    this.answer = '';
  }

  setTitle(title: Title[], answer: string): void {
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
