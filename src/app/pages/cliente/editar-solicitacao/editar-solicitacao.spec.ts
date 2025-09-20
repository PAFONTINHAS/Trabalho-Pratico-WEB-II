import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarSolicitacao } from './editar-solicitacao';

describe('EditarSolicitacao', () => {
  let component: EditarSolicitacao;
  let fixture: ComponentFixture<EditarSolicitacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarSolicitacao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarSolicitacao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
