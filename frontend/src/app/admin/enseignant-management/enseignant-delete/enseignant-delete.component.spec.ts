import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnseignantDeleteComponent } from './enseignant-delete.component';

describe('EnseignantDeleteComponent', () => {
  let component: EnseignantDeleteComponent;
  let fixture: ComponentFixture<EnseignantDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnseignantDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnseignantDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
