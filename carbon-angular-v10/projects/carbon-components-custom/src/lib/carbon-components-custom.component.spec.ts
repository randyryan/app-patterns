import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarbonComponentsCustomComponent } from './carbon-components-custom.component';

describe('CarbonComponentsCustomComponent', () => {
  let component: CarbonComponentsCustomComponent;
  let fixture: ComponentFixture<CarbonComponentsCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarbonComponentsCustomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarbonComponentsCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
