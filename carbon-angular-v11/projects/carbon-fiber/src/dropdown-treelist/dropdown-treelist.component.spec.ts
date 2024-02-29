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
});
