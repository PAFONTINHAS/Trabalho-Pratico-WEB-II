import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarOrcamento } from './confirmar-orcamento';

describe('ConfirmarOrcamento', () => {
  let component: ConfirmarOrcamento;
  let fixture: ComponentFixture<ConfirmarOrcamento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmarOrcamento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmarOrcamento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
