import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarProfComponent } from './side-bar-prof.component';

describe('SideBarProfComponent', () => {
  let component: SideBarProfComponent;
  let fixture: ComponentFixture<SideBarProfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideBarProfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideBarProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
