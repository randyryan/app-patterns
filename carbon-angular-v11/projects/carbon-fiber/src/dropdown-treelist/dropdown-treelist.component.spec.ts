import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownTreelist } from './dropdown-treelist.component';

describe('DropdownTreelistComponent', () => {
  let component: DropdownTreelist;
  let fixture: ComponentFixture<DropdownTreelist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownTreelist]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DropdownTreelist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return correct index', () => {
    expect(component.selectedIndex).toBe(-1);

    component.items = [
      { content: '0', selected: true, disabled: false }
    ];

    expect(component.selectedIndex).toBe(0);

    component.items = [
      { content: '0', selected: false, disabled: false},
      { content: '1', selected: true, disabled: false }
    ];

    expect(component.selectedIndex).toBe(1);
    expect(component.hasNextElement()).toBeFalse();
  });

  it('should return false on hasNextElement when current is the last', () => {
    // [ current ] = false

    component.items = [
      { content: '0', selected: true, disabled: false }
    ]

    expect(component.selectedIndex).toBe(0);
    expect(component.hasNextElement()).toBeFalse();

    // [ enabled, current ] = false;

    component.items = [
      { content: '0', selected: false, disabled: false },
      { content: '1', selected: true, disabled: false }
    ]

    expect(component.selectedIndex).toBe(1);
    expect(component.hasNextElement()).toBeFalse();
  });

  it('should return true on hasNextElement when current is the second last', () => {
    // [ current, enabled ] = true

    component.items = [
      { content: '0', selected: true, disabled: false },
      { content: '1', selected: false, disabled: false }
    ];

    expect(component.selectedIndex).toBe(0);
    expect(component.hasNextElement()).toBeTrue();
  });

  it('should return false on hasNextElement when current is the second last', () => {
    // [ current, disabled ] = false

    component.items = [
      { content: '0', selected: true, disabled: false },
      { content: '1', selected: false, disabled: true }
    ];

    expect(component.selectedIndex).toBe(0);
    expect(component.hasNextElement()).toBeFalse();
  });

  it('should return true on hasNextElement when current is the third last', () => {
    // [ current, enabled, enabled ] = true

    component.items = [
      { content: '0', selected: true, disabled: false },
      { content: '1', selected: false, disabled: false },
      { content: '2', selected: false, disabled: false }
    ];

    expect(component.selectedIndex).toBe(0);
    expect(component.hasNextElement()).toBeTrue();

    // [ current, enabled, disabled ] = true

    component.items = [
      { content: '0', selected: true, disabled: false },
      { content: '1', selected: false, disabled: false },
      { content: '2', selected: false, disabled: true }
    ];

    expect(component.selectedIndex).toBe(0);
    expect(component.hasNextElement()).toBeTrue();

    // [ current, disabled, enabled ] = true

    component.items = [
      { content: '0', selected: true, disabled: false },
      { content: '1', selected: false, disabled: true },
      { content: '2', selected: false, disabled: false }
    ];

    expect(component.selectedIndex).toBe(0);
    expect(component.hasNextElement()).toBeTrue();
  });

  it('should return false on hasNextElement when current is the third last', () => {
    // [ current, disabled, disabled ] = false

    component.items = [
      { content: '0', selected: true, disabled: false },
      { content: '1', selected: false, disabled: true },
      { content: '2', selected: false, disabled: true }
    ];

    expect(component.selectedIndex).toBe(0);
    expect(component.hasNextElement()).toBeFalse();

    // This failed be cause the logic:
    // is not last && (is not second last || next is not disabled)
    // true && (true || false) = true
  });

  it('should return false on hasPrevElement when current is the first', () => {
    // [ current ] = false

    component.items = [
      { content: '0', selected: true }
    ];

    expect(component.selectedIndex).toBe(0);
    expect(component.hasPrevElement()).toBeFalse();

    // [ current, enabled ] = false

    component.items = [
      { content: '0', selected: true },
      { content: '1', selected: false }
    ]

    expect(component.selectedIndex).toBe(0);
    expect(component.hasPrevElement()).toBeFalse();
  });

  it('should return true on hasPrevElement when current is the second', () => {
    // [ enabled, current ] = true

    component.items = [
      { content: '0', selected: false },
      { content: '1', selected: true }
    ];

    expect(component.selectedIndex).toBe(1);
    expect(component.hasPrevElement()).toBeTrue();
  });

  it('should return false on hasPrevElement when current is the second', () => {
    // [ disabled, current ] = false

    component.items = [
      { content: '0', selected: false, disabled: true },
      { content: '1', selected: true }
    ];

    expect(component.selectedIndex).toBe(1);
    expect(component.hasPrevElement()).toBeFalse();
  });

  it('should return true on hasPrevElement when current is the third', () => {
    // [ enabled, enabled, current ] = true

    component.items = [
      { content: '0', selected: false },
      { content: '1', selected: false },
      { content: '2', selected: true }
    ];

    expect(component.selectedIndex).toBe(2);
    expect(component.hasPrevElement()).toBeTrue();

    // [ enabled, disabled, current ] = true

    component.items = [
      { content: '0', selected: false },
      { content: '1', selected: false, disabled: true },
      { content: '2', selected: true }
    ];

    expect(component.selectedIndex).toBe(2);
    expect(component.hasPrevElement()).toBeTrue();

    // [ disabled, enabled, current ] = true

    component.items = [
      { content: '0', selected: false, disabled: true },
      { content: '1', selected: false },
      { content: '2', selected: true }
    ];

    expect(component.selectedIndex).toBe(2);
    expect(component.hasPrevElement()).toBeTrue();
  });

  it('should return false on hasPrevElement when current is the third', () => {
    // [ disabled, disabled, current ] = false

    component.items = [
      { content: '0', selected: false, disabled: true },
      { content: '1', selected: false, disabled: true },
      { content: '2', selected: true }
    ];

    expect(component.selectedIndex).toBe(2);
    expect(component.hasPrevElement()).toBeFalse();
  });
});
