import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizarManutencao } from './finalizar-manutencao';

describe('FinalizarManutencao', () => {
  let component: FinalizarManutencao;
  let fixture: ComponentFixture<FinalizarManutencao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalizarManutencao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalizarManutencao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
