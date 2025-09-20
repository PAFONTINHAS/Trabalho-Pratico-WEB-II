import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejeitarOrcamento } from './rejeitar-orcamento';

describe('RejeitarOrcamento', () => {
  let component: RejeitarOrcamento;
  let fixture: ComponentFixture<RejeitarOrcamento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RejeitarOrcamento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejeitarOrcamento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
