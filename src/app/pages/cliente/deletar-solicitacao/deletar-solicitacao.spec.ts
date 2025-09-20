import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletarSolicitacao } from './deletar-solicitacao';

describe('DeletarSolicitacao', () => {
  let component: DeletarSolicitacao;
  let fixture: ComponentFixture<DeletarSolicitacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletarSolicitacao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletarSolicitacao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
