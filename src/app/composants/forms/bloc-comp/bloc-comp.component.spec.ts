import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BlocCompComponent} from './bloc-comp.component';

describe('BlocCompComponent', () => {
  let component: BlocCompComponent;
  let fixture: ComponentFixture<BlocCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlocCompComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
