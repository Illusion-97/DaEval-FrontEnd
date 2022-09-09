import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MatErrorsComponent} from './mat-errors.component';

describe('MatErrorsComponent', () => {
  let component: MatErrorsComponent;
  let fixture: ComponentFixture<MatErrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatErrorsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
