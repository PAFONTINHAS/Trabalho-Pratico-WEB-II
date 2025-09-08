import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarFuncionarios } from './gerenciar-funcionarios';

describe('GerenciarFuncionarios', () => {
  let component: GerenciarFuncionarios;
  let fixture: ComponentFixture<GerenciarFuncionarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenciarFuncionarios]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenciarFuncionarios);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
