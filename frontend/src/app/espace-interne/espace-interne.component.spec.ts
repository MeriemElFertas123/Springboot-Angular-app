import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceInterneComponent } from './espace-interne.component';

describe('EspaceInterneComponent', () => {
  let component: EspaceInterneComponent;
  let fixture: ComponentFixture<EspaceInterneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspaceInterneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspaceInterneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
