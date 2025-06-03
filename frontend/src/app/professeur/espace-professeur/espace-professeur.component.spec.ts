import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceProfesseurComponent } from './espace-professeur.component';

describe('EspaceProfesseurComponent', () => {
  let component: EspaceProfesseurComponent;
  let fixture: ComponentFixture<EspaceProfesseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspaceProfesseurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspaceProfesseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
