import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeStageComponent } from './liste-stage.component';

describe('ListeStageComponent', () => {
  let component: ListeStageComponent;
  let fixture: ComponentFixture<ListeStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeStageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
