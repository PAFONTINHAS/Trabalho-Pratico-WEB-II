import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaisConfirmacao } from './modais-confirmacao';

describe('ModaisConfirmacao', () => {
  let component: ModaisConfirmacao;
  let fixture: ComponentFixture<ModaisConfirmacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModaisConfirmacao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModaisConfirmacao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
