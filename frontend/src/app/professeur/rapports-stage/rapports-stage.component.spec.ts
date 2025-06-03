import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportsStageComponent } from './rapports-stage.component';

describe('RapportsStageComponent', () => {
  let component: RapportsStageComponent;
  let fixture: ComponentFixture<RapportsStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RapportsStageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RapportsStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
