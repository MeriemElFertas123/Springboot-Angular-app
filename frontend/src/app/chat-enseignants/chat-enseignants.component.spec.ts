import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatEnseignantsComponent } from './chat-enseignants.component';

describe('ChatEnseignantsComponent', () => {
  let component: ChatEnseignantsComponent;
  let fixture: ComponentFixture<ChatEnseignantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatEnseignantsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatEnseignantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
