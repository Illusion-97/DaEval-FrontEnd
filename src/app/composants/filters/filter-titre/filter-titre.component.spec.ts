import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterTitreComponent } from './filter-titre.component';

describe('FilterTitreComponent', () => {
  let component: FilterTitreComponent;
  let fixture: ComponentFixture<FilterTitreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterTitreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterTitreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
