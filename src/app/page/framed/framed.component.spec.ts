import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FramedComponent} from './framed.component';

describe('FramedComponent', () => {
  let component: FramedComponent;
  let fixture: ComponentFixture<FramedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FramedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FramedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
