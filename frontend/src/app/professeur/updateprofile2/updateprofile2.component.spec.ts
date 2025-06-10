import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Updateprofile2Component } from './updateprofile2.component';

describe('Updateprofile2Component', () => {
  let component: Updateprofile2Component;
  let fixture: ComponentFixture<Updateprofile2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Updateprofile2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Updateprofile2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
