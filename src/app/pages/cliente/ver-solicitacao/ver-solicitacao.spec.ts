import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerSolicitacao } from './ver-solicitacao';

describe('VerSolicitacao', () => {
  let component: VerSolicitacao;
  let fixture: ComponentFixture<VerSolicitacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerSolicitacao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerSolicitacao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
