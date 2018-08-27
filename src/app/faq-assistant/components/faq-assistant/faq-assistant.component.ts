import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  ViewEncapsulation
} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {FaqItemContentInterface} from '../../interfaces/faq-item.interface';
import {FaqItemListService} from '../../services/faq-item.service';
import {CommunicationFaqAssistantService} from '../../services/communication-faq-assistant.service';

@Component({
  selector: 'app-faq-assistant',
  templateUrl: './faq-assistant.component.html',
  styleUrls: ['./faq-assistant.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FaqAssistantComponent implements OnInit {

  titleList: object;
  items: Array<object>;
  showFinish = false;
  lastStep: boolean;
  showBack = false;
  answer: string;
  componentRef: any;
  stateFaqContainer: Subscription;
  isContainerVisible = false;
  indexConfigList: Array<string>;

  @Input() customClass: string;
  @Input() data: FaqItemContentInterface[];
  @Input() params: any;
  @ViewChild('finalAnswer', {read: ViewContainerRef}) finalAnswerContent: ViewContainerRef;

  ngOnInit() {
    this.getTitleList();
    this.stateFaqContainer = this.communicationFaqAssistantService.receiveVisibilityState().subscribe(stateContainer => {
      this.isContainerVisible = stateContainer;
    });
  }

  constructor(
    private itemManager: FaqItemListService,
    private viewContainerRef: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
    private communicationFaqAssistantService: CommunicationFaqAssistantService
  ) {
  }

  private createComponent(answer: any, params: any): void {
    setTimeout(() => {
      this.finalAnswerContent.clear();
      const factory = this.resolver.resolveComponentFactory(answer);
      this.componentRef = this.finalAnswerContent.createComponent(factory);
      this.componentRef.instance.data = params;
    });
  }

  private getTitleList(): void {
    this.titleList = this.data;
    this.itemManager.setInitialStateData(this.titleList);
    this.indexConfigList = Object.keys(this.titleList);
    this.itemManager.setPipeLineItem(this.titleList);
  }

  private clearDataComponent(): void {
    if (this.finalAnswerContent) {
      this.finalAnswerContent.clear();
    }
    this.answer = '';
  }

  private setTitle(item): void {
    if (Array.isArray(item.content)) {
      this.titleList = this.itemManager.getItemsById(item.content);
      this.indexConfigList = Object.keys(this.titleList);
      this.itemManager.setPipeLineItem(item);
      this.showBack = true;
    } else if (typeof item.content === 'function') {
      this.createComponent(item.content, this.params);
      this.showFinish = true;
      this.showBack = true;
      this.lastStep = true;
    } else {
      this.answer = item.content;
      this.showFinish = true;
      this.showBack = true;
      this.lastStep = true;
    }
  }

  private setInitialStateData() {
    this.titleList = this.itemManager.getInitialStateData();
    this.indexConfigList = Object.keys(this.titleList);
  }

  private back(): void {
    this.clearDataComponent();
    this.items = this.itemManager.getItems();

    if (this.lastStep) {
      const lastItem = this.itemManager.getLastItem();

      if (this.items.length === 1) {
        this.setInitialStateData();
      } else {
        this.titleList = this.itemManager.getItemsById(lastItem.content);
        this.indexConfigList = Object.keys(this.titleList);
      }

      this.showFinish = false;
      this.lastStep = false;
    } else {
      const lastItem = this.itemManager.getLastItem();
      this.itemManager.removeLastItem();

      if (this.items.length === 1) {
        this.setInitialStateData();
      } else {
        this.titleList = this.itemManager.getItemsById(lastItem.content);
        this.indexConfigList = Object.keys(this.titleList);
      }
    }

    if (this.items.length === 1) {
      this.showBack = false;
    }
  }
}
