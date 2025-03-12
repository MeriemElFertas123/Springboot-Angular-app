import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnseignantManagementComponent } from './enseignant-management.component';

describe('EnseignantManagementComponent', () => {
  let component: EnseignantManagementComponent;
  let fixture: ComponentFixture<EnseignantManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnseignantManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnseignantManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
