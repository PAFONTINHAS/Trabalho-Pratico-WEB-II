import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarFuncionario } from './criar-funcionario';

describe('CriarFuncionario', () => {
  let component: CriarFuncionario;
  let fixture: ComponentFixture<CriarFuncionario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarFuncionario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarFuncionario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
