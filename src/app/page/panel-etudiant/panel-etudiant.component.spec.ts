import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PanelEtudiantComponent} from './panel-etudiant.component';

describe('PanelEtudiantComponent', () => {
  let component: PanelEtudiantComponent;
  let fixture: ComponentFixture<PanelEtudiantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelEtudiantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
