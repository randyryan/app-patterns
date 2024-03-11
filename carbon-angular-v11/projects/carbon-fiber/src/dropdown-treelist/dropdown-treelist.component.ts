import _ from 'lodash';
import { Observable, Subscription, debounceTime, filter, first, fromEvent, isObservable, map, of } from 'rxjs';
import { AfterViewInit, ApplicationRef, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { AbstractDropdownView, I18n, I18nModule, ListItem } from 'carbon-components-angular';
// import { watchFocusJump } from 'carbon-components-angular/dropdown/dropdowntools';
import { ScrollCustomEvent } from 'carbon-components-angular/dropdown/list/scroll-custom-event.interface';
import { CommonModule } from '@angular/common';

function watchFocusJump(target: HTMLElement, elements: any[]): Observable<HTMLElement> {
  return fromEvent(target, "keydown")
    .pipe(
      debounceTime(150),
      map((ev: Event) => {
        let el = elements.find((itemEl: any) =>
          itemEl.textContent.trim().toLowerCase().startsWith((ev as KeyboardEvent).key));
        if (el) { return el; }
      }),
      filter(el => !!el)
    );
}

@Component({
  selector: 'cf-dropdown-treelist',
  standalone: true,
  imports: [
    CommonModule,
    I18nModule
  ],
  templateUrl: './dropdown-treelist.component.html',
  styleUrl: './dropdown-treelist.component.scss'
})
export class DropdownTreelist implements AbstractDropdownView, AfterViewInit, OnDestroy {
  /**
   * The Dropdown list's way to generate ID.
   */
  static instanceCount = 0;

  @ViewChild("list", { static: true }) list!: ElementRef;
  @ViewChildren("listItem") protected listItems?: QueryList<ElementRef<HTMLElement>>;

  public displayItems: ListItem[] = [];
  /**
   * The ID of the highlighted item.
   *               (focused) item
   */
  public highlightedItem?: string;
  protected _originalItems!: ListItem[] | Observable<ListItem[]>;
  /**
   * The index of the selected item.
   */
  protected index = -1;

  get selectedIndex(): number {
    return this.index;
  }

  protected _items: ListItem[] = [];
  protected _itemsSubscription?: Subscription; // _items
  protected _itemsReady?: Observable<boolean>; // _itemsReady
  protected focusJump?: Subscription;
  @Input() itemTpl?: TemplateRef<any>;

  @Input() ariaLabel = this.i18n.get().DROPDOWN_LIST.LABEL;
  /**
   * Whether showing the title arribute or not.
   */
  @Input() showTitles = true;

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
  // Constructor and ng lifecycle hooks
  //

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

  //
  // Internally invoked functions
  //

  /**
   * Utility method that returns item ID
   */
  getItemId(itemIndex: number): string {
    return `${this.listId}-${itemIndex}}`;
  }

  /**
   * Utility method invoked by items setter.
   */
  updateItems(items: ListItem[]): void {
    this._items = items.map(item => _.cloneDeep(item));
    this.displayItems = this._items;
    this.updateIndex();
    this.setupFocusObservable();
    this.emitSelect();
  }

  /**
   * Maintains the index of the selected item, invoked by:
   *     (1) setting items (updateItems)
   *     (2) filtering items (filterBy)
   *     (3) initFocus
   *     (4) reorderSelected
   */
  updateIndex(): void {
    const selectedItems = this.getSelected();
    if (selectedItems.length) {
      this.index = this.displayItems.indexOf(selectedItems[0]);
    // } else if (this.hasNextElement()) {
    // else if is redundant because this.getNextElement() won't update index
    // if there are no non-disabled items starting with next item
    } else {
      this.getNextElement(); // the index is updated there
    }
  }

  setupFocusObservable(): void {
    if (this.list) {
      if (this.focusJump) {
        this.focusJump.unsubscribe();
      }
      // Check on the possibility of using this.listItems
      const elListItems = Array.from<HTMLElement>(this.list.nativeElement.querySelectorAll('li'));
      this.focusJump = watchFocusJump(this.list.nativeElement, elListItems)
        .subscribe(el => el.focus());
    }
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

  //
  // AbstractDropdownView methods
  //
  // Inconsistencies between getNextItem and getNextElement, getPrevItem and getPrevElement:
  // get element checks enable states and skip the ones that are disabled whereas get item doesn't
  //

  /**
   * Gets the {@link ListItem} that is subsequent to the selected item.
   *
   * @override {@link AbstractDropdownView.getNextItem}
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
   * @override {@link AbstractDropdownView.hasNextElement}
   */
  hasNextElement(): boolean {
    // The original logic:
    //     is not last && (is not second last || next is not disabled)
    // will fail for case:
    //     [ current, disabled, disabled ] = false
    // because it translates to:
    //     true && (true || false) = true

    // This logic will return true when there is any enabled item at any subsequent index position
    return this.index < this.displayItems.length - 1 &&
        this._items.slice(this.index + 1).some(item => !item.disabled);
  }

  /**
   * Gets the {@link HTMLElement} that is subsequent to the selected item.
   *
   * @override {@link AbstractDropdownView.getNextElement}
   */
  getNextElement(): HTMLElement {
    const listElements = this.listItems ? this.listItems.toArray() : [];
    if (listElements.length) {
      // Start with the next, set index and return the first enabled if found
      for (let i = this.index + 1; i < listElements.length; i++) {
        if (!this.displayItems[i].disabled) {
          return listElements[this.index = i].nativeElement;
        }
      }
    }

    return null;
  }

  /**
   * Gets the {@link ListItem} that precedes the selected item.
   *
   * @override {@link AbstractDropdownView.getPrevItem}
   */
  getPrevItem(): ListItem {
    if (this.index > 0) {
      this.index--;
    }
    return this.displayItems[this.index];
  }

  /**
   * Wether the selected item has a preceding item.
   *
   * @override {@link AbstractDropdownView.getPrevElement}
   */
  hasPrevElement(): boolean {
    // The original logic:
    //     is not first && (is not second || first is not disabled)
    // will fail for case:
    //     [ disabled, disabled, current ]
    // because it translates to:
    //     true && (true || false) = true

    // This logic will return true when there is any enabled item at any preceding index position
    return this.index > 0 &&
        this._items.slice(0, this.index).some(item => !item.disabled);
  }

  /**
   * Gets the {@link HTMLElement} that precedes the selected item.
   *
   * @override {@link AbstractDropdownView.getPrevElement}
   */
  getPrevElement(): HTMLElement {
    const listElements = this.listItems ? this.listItems.toArray() : [];
    if (listElements.length) {
      // Start with the previous, set index and return the first enabled if found traversing backwards
      for (let i = this.index - 1; i < this.index && i >= 0; i--) {
        if (!this.displayItems[i].disabled) {
          return listElements[this.index = i].nativeElement;
        }
      }
    }

    return null;
  }

  /**
   * @override {@link AbstractDropdownView.getSelected}
   */
  getSelected(): ListItem[] {
    return this._items.filter(i => i.selected);
  }

  /**
   * @override {@link AbstractDropdownView.getCurrentItem}
   */
  getCurrentItem(): ListItem {
    if (this.index < 0) {
      return this.displayItems[0];
    }
    return this.displayItems[this.index];
  }

  /**
   * @override {@link AbstractDropdownView.getCurrentElement}
   */
  getCurrentElement(): HTMLElement {
    return this.listItems.toArray()[this.index < 0 ? this.index = 0 : this.index].nativeElement;
  }

  /**
   * @override {@link AbstractDropdownView.getListItems}
   */
  getListItems(): ListItem[] {
    return this._items;
  }

  /**
   * Sets the selections states of {@link ListItem}s by the states from the passed items.
   *
   * @override {@link AbstractDropdownView.propagateSelected}
   */
  propagateSelected(items: ListItem[]): void {
    this.onItemsReady(() => {
      if (!Array.isArray(items)) {
        console.error(`${this.constructor.name}.propagateSelected expects a ListItem[], got ${JSON.stringify(items)}`);
      }

      for (let targetItem of this._items) {
        const sourceItem = items.find(item => {
          const tItem = _.clone(targetItem);
          delete tItem.selected;
          const sItem = _.clone(item);
          delete sItem.selected;

          return _.isEqual(tItem, sItem);
        });

        if (sourceItem) {
          targetItem.selected = sourceItem.selected;
        } else {
          targetItem.selected = false;
        }
      }
    });
  }

  /**
   * @override {@link AbstractDropdownView.filterBy}
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
   * @override {@link AbstractDropdownView.initFocus}
   */
  initFocus(): void {
    if (this.index < 0) {
      this.updateIndex();
    }

    this.list.nativeElement.focus();
    setTimeout(() => {
      this.highlightedItem = this.getItemId(this.index);
    });
  }

  /**
   * @override {@link AbstractDropdownView.onItemsReady}
   */
  onItemsReady(subcription: () => void): void {
    (this._itemsReady || of(true)).pipe(first()).subscribe(subcription);
  }

  /**
   * Bring the selected items to the top of the list.
   *
   * @override {@link AbstractDropdownView.reorderSelected}
   */
  reorderSelected(moveFocus = true): void {
    this.displayItems = this.getSelected().concat(this.getListItems().filter(i => !i.selected));
    if (moveFocus) {
      setTimeout(() => {
        this.updateIndex();
        this.highlightedItem = this.getItemId(this.index);
      });
    }
  }

  //
  // Template invoked methods
  //

  navigateList(event: KeyboardEvent): void {
    if (event.key === "Enter" || event.key === " ") {
      if (this.listItems.some(item => item.nativeElement === event.target)) {
        event.preventDefault();
      }
      if (event.key === "Enter") {
        this.onClick(event, this.getCurrentItem());
      }
    }
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();
      if (event.key === "ArrowUp") {
        if (this.hasPrevElement()) {
          this.getPrevElement().scrollIntoView({ block: "nearest" });
        } else {
          this.blurIntent.emit("top");
        }
      }
      if (event.key === "ArrowDown") {
        if (this.hasNextElement()) {
          this.getNextElement().scrollIntoView({ block: "end" });
        } else {
          this.blurIntent.emit("bottom");
        }
      }

      setTimeout(() => this.highlightedItem = this.getItemId(this.index));
    }
  }

  onClick(event: Event, item: ListItem): void {
    event.preventDefault();
    if (item && !item.disabled) {
      this.list.nativeElement.focus();

      if (this.type === "single") {
        item.selected = true;
        for (let otherItem of this.getListItems()) {
          if (item !== otherItem) {
            otherItem.selected = false;
          }
        }
      }
      if (this.type === "multi") {
        item.selected = !item.selected;
      }

      this.index = this.displayItems.indexOf(item);
      this.highlightedItem = this.getItemId(this.index);
      this.emitSelect(false);
      this.applicationRef.tick();
    }
  }

  onScroll(event: any): void {
    this.scroll.emit({
      atTop: event.srcElement.scrollTip === 0,
      atBottom: event.srcElement.scrollHeight - event.srcElement.scrollTop === event.srcElement.clientHeight,
      event
    });
  }
}
