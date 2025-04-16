import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatEtudiantsComponent } from './chat-etudiants.component';

describe('ChatEtudiantsComponent', () => {
  let component: ChatEtudiantsComponent;
  let fixture: ComponentFixture<ChatEtudiantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatEtudiantsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatEtudiantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
