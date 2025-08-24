import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoverManutencao } from './mover-manutencao';

describe('MoverManutencao', () => {
  let component: MoverManutencao;
  let fixture: ComponentFixture<MoverManutencao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoverManutencao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoverManutencao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
