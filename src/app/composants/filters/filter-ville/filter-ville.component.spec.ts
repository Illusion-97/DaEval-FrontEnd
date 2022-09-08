import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FilterVilleComponent} from './filter-ville.component';

describe('FilterVilleComponent', () => {
  let component: FilterVilleComponent;
  let fixture: ComponentFixture<FilterVilleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterVilleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterVilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
