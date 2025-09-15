import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudEquipamento } from './crud-equipamento';

describe('CrudEquipamento', () => {
  let component: CrudEquipamento;
  let fixture: ComponentFixture<CrudEquipamento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudEquipamento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudEquipamento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
