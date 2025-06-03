import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeposerStageComponent } from './deposer-stage.component';

describe('DeposerStageComponent', () => {
  let component: DeposerStageComponent;
  let fixture: ComponentFixture<DeposerStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeposerStageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeposerStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
