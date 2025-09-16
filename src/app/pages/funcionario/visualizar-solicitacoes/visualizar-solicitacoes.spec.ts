import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarSolicitacoes } from './visualizar-solicitacoes';

describe('VisualizarSolicitacoes', () => {
  let component: VisualizarSolicitacoes;
  let fixture: ComponentFixture<VisualizarSolicitacoes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizarSolicitacoes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizarSolicitacoes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
