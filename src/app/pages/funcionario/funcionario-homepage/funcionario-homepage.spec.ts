import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionarioHomepage } from './funcionario-homepage';

describe('FuncionarioHomepage', () => {
  let component: FuncionarioHomepage;
  let fixture: ComponentFixture<FuncionarioHomepage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncionarioHomepage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncionarioHomepage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
