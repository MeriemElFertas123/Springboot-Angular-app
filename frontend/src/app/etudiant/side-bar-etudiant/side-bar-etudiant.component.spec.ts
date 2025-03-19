import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarEtudiantComponent } from './side-bar-etudiant.component';

describe('SideBarEtudiantComponent', () => {
  let component: SideBarEtudiantComponent;
  let fixture: ComponentFixture<SideBarEtudiantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideBarEtudiantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideBarEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
