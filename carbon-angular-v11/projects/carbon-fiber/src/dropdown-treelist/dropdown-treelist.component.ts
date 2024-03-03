import _ from 'lodash';
import { Observable, Subscription, first, isObservable, of } from 'rxjs';
import { AfterViewInit, ApplicationRef, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { AbstractDropdownView, I18n, ListItem } from 'carbon-components-angular';
import { watchFocusJump } from 'carbon-components-angular/dropdown/dropdowntools';
import { ScrollCustomEvent } from 'carbon-components-angular/dropdown/list/scroll-custom-event.interface';

@Component({
  selector: 'cf-dropdown-treelist',
  standalone: true,
  imports: [],
  templateUrl: './dropdown-treelist.component.html',
  styleUrl: './dropdown-treelist.component.scss'
})
export class DropdownTreelist implements AbstractDropdownView, AfterViewInit, OnDestroy {
  /**
   * The Dropdown list's way to generate ID.
   */
  static instanceCount = 0;

  @ViewChild("list", { static: true }) list!: ElementRef;
  @ViewChildren("listItem") protected listItems!: QueryList<ElementRef>;

  /**
   * @override
   */
  @Input() set items(items: ListItem[] | Observable<ListItem[]>) {
    if (isObservable(items)) {
      if (this._itemsSubscription) {
        this._itemsSubscription.unsubscribe();
      }
      this._itemsReady = new Observable<boolean>((observer) => {
        this._itemsSubscription = items.subscribe(i => {
          this.updateItems(i);
          observer.next(true);
          observer.complete();
        })
      });
      this.onItemsReady(null);
    } else {
      this.updateItems(items);
    }
    this._originalItems = items;
  }

  /**
   * @override
   */
  get items(): ListItem[] | Observable<ListItem[]> {
    return this._originalItems;
  }

  /**
   * Emits selections occurred on the component.
   *
   * @override
   */
  @Output() select: EventEmitter<ListItem[] | { item: ListItem, isUpdate?: boolean }> = new EventEmitter();

  /**
   * Emits scrollings occurred on the component.
   */
  @Output() scroll: EventEmitter<ScrollCustomEvent> = new EventEmitter();

  /**
   * @override
   */
  @Output() blurIntent: EventEmitter<'top' | 'bottom'> = new EventEmitter();

  /**
   * @override
   */
  @Input() type: 'single' | 'multi' = 'single';

  /**
   * @override
   */
  public size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * @override
   */
  listId = `listbox-${DropdownTreelist.instanceCount++}`;

  //
  //
  //
  public displayItems: ListItem[] = [];
  public highlightedItem?: string;
  protected _originalItems!: ListItem[] | Observable<ListItem[]>;
  /**
   * The index of the selected item.
   */
  protected index = -1;
  protected _items?: ListItem[];
  protected _itemsSubscription?: Subscription; // _items
  protected _itemsReady?: Observable<boolean>; // _itemsReady
  protected focusJump?: Subscription;
  @Input() itemTpl?: string | TemplateRef<any>;

  @Input() ariaLabel = this.i18n.get().DROPDOWN_LIST.LABEL;
  /**
   * Whether showing the title arribute or not.
   */
  @Input() showTitles = true;

  constructor(public elementRef: ElementRef, protected i18n: I18n, protected applicationRef: ApplicationRef) { }

  ngAfterViewInit(): void {
    this.index = this.getListItems().findIndex(item => item.selected);
    this.setupFocusObservable();
    setTimeout(() => this.emitSelect(true));
  }

  ngOnDestroy(): void {
    if (this.focusJump) {
      this.focusJump.unsubscribe();
    }
    if (this._itemsSubscription) {
      this._itemsSubscription.unsubscribe();
    }
  }

  /**
   * Internally invoked function.
   */
  getItemId(itemIndex: number): string {
    return `${this.listId}-${itemIndex}}`;
  }

  /**
   * Internally invoked function by items setter.
   */
  updateItems(items: ListItem[]): void {
    this._items = items.map(item => _.cloneDeep(item));
    this.displayItems = this._items;
    this.updateIndex();
    this.setupFocusObservable();
    this.emitSelect();
  }

  /**
   * Internally invoked function.
   * The timing the function is invoked:
   *     (1) setting items (updateItems)
   *     (2) filtering items (filterBy)
   *     (3) initFocus
   *     (4) reorderSelected
   */
  updateIndex(): void {
    const selected = this.getSelected();
    if (selected.length) {
      this.index = this.displayItems.indexOf(selected[0]);
    } else if (this.hasNextElement()) {
      this.getNextElement();
    }
  }

  setupFocusObservable(): void {
    if (!this.list) {
      return;
    }

    if (this.focusJump) {
      this.focusJump.unsubscribe();
    }
    let elList = Array.from(this.list.nativeElement.querySelectorAll("li"));
    this.focusJump = watchFocusJump(this.list.nativeElement, elList).subscribe(el => el.focus());
  }

  /**
   * Internally invoked function. Emits selection(s) determined by other internal states (_items).
   * The timing the function is invoked:
   *     (1) view init
   *     (2) update items
   *     (3) clicking on items
   */
  emitSelect(isUpdate = true) {
    if (this.type === 'single') {
      // Type-asserted
      this.select.emit({ item: this._items!.find(item => item.selected)!, isUpdate: isUpdate });
    } else {
      // abuse javascripts object mutability until we can break the API and switch to { items: [], isUpdate: true }
      const selected = this.getSelected() || [];
      selected['isUpdate'] = isUpdate;
      this.select.emit(selected);
    }
  }

  /**
   * Gets the next item of the selected item.
   *
   * @override
   */
  getNextItem(): ListItem {
    if (this.index < this.displayItems.length - 1) {
      this.index++;
    }
    return this.displayItems[this.index];
  }

  /**
   * Whether the selected item has a next item.
   *
   * @override
   */
  hasNextElement(): boolean {
    return this.index < this.displayItems.length - 1 &&
      (!(this.index === this.displayItems.length - 2) || !this.displayItems[this.index + 1].disabled);
  }
  /**
   * @override
   */
  getNextElement(): HTMLElement {
    throw new Error('Method not implemented.');
  }
  /**
   * @override
   */
  getPrevItem(): ListItem {
    throw new Error('Method not implemented.');
  }
  /**
   * @override
   */
  hasPrevElement(): boolean {
    throw new Error('Method not implemented.');
  }
  /**
   * @override
   */
  getPrevElement(): HTMLElement {
    throw new Error('Method not implemented.');
  }
  /**
   * @override
   */
  getSelected(): ListItem[] {
    throw new Error('Method not implemented.');
  }
  /**
   * @override
   */
  getCurrentItem(): ListItem {
    throw new Error('Method not implemented.');
  }
  /**
   * @override
   */
  getCurrentElement(): HTMLElement {
    throw new Error('Method not implemented.');
  }
  /**
   * @override
   */
  getListItems(): ListItem[] {
    throw new Error('Method not implemented.');
  }
  /**
   * @override
   */
  propagateSelected(value: ListItem[]): void {
    throw new Error('Method not implemented.');
  }

  /**
   * @override
   */
  filterBy(query: string = ''): void {
    if (query) {
      this.displayItems = this.getListItems().filter(i => i.content.toLowerCase().includes(query.toLocaleLowerCase()));
      if (this.displayItems) {
        this.index = 0;
      }
    } else {
      this.displayItems = this.getListItems();
    }

    this.updateIndex();
  }

  /**
   * @override
   */
  initFocus(): void {
    throw new Error('Method not implemented.');
  }
  /**
   * @override
   */
  onItemsReady(subcription: () => void): void {
    (this._itemsReady || of(true)).pipe(first()).subscribe(subcription);
  }
  /**
   * @override
   */
  reorderSelected(moveFocus?: boolean | undefined): void {
    throw new Error('Method not implemented.');
  }

}
