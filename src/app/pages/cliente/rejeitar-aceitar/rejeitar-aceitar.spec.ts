import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejeitarAceitar } from './rejeitar-aceitar';

describe('RejeitarAceitar', () => {
  let component: RejeitarAceitar;
  let fixture: ComponentFixture<RejeitarAceitar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RejeitarAceitar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejeitarAceitar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
