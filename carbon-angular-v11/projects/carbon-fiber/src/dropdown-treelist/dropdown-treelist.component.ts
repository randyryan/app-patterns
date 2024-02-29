import { ApplicationRef, Component, ElementRef, EventEmitter, Input, ViewChild } from '@angular/core';
import { AbstractDropdownView, I18n, ListItem } from 'carbon-components-angular';
import { Observable, Subscription, debounceTime, filter, first, fromEvent, isObservable, map, of } from 'rxjs';
import _ from 'lodash';

@Component({
  selector: 'cf-dropdown-treelist',
  standalone: true,
  imports: [],
  templateUrl: './dropdown-treelist.component.html',
  styleUrl: './dropdown-treelist.component.scss'
})
export class DropdownTreelist implements AbstractDropdownView {
  /**
   * Mimick Dropdown list's way to generate ID
   */
  static instanceCount = 0;

  @ViewChild("list", { static: true }) list!: ElementRef;

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
   * @override
   */
  select: EventEmitter<ListItem[] | { item: ListItem, isUpdate?: boolean }> = new EventEmitter();
  /**
   * @override
   */
  blurIntent: EventEmitter<'top' | 'bottom'> = new EventEmitter();
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

  protected _originalItems!: ListItem[] | Observable<ListItem[]>;

  protected index = -1;

  protected _items?: ListItem[];

  protected _itemsSubscription?: Subscription; // _items

  protected _itemsReady?: Observable<boolean>; // _itemsReady

  protected focusJump?: Subscription;

  constructor(public elementRef: ElementRef, protected i18n: I18n, protected applicationRef: ApplicationRef) { }

  updateItems(items: ListItem[]): void {
    this._items = items.map(item => _.cloneDeep(item));
    this.displayItems = this._items;
    this.updateIndex();
    this.setupFocusObservable();
    this.doEmitSelect();
  }

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
    this.focusJump = this.watchFocusJump(this.list.nativeElement, elList).subscribe(el => el.focus());
  }

  doEmitSelect(isUpdate = true) {
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

  // Extracted from dropdown/dropdowntools.ts since it's not exported
  watchFocusJump(target: HTMLElement, elements: any[]): Observable<HTMLElement> {
    return fromEvent(target, "keydown")
      .pipe(
        debounceTime(150),
        map((event: Event) => {
          let el = elements.find((itemEl: HTMLElement) =>
            // Type-asserted
            itemEl.textContent!.trim().toLowerCase().startsWith((event as KeyboardEvent).key));
          if (el) { return el; }
        }),
        filter(el => !!el)
      );
  }


  /**
   * @override
   */
  getNextItem(): ListItem {
    throw new Error('Method not implemented.');
  }
  /**
   * @override
   */
  hasNextElement(): boolean {
    throw new Error('Method not implemented.');
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
  filterBy(value: string): void {
    throw new Error('Method not implemented.');
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
