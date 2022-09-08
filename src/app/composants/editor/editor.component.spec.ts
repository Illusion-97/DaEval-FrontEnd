import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditorOldComponent} from './editorOld.component';

describe('EditorComponent', () => {
  let component: EditorOldComponent;
  let fixture: ComponentFixture<EditorOldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditorOldComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
