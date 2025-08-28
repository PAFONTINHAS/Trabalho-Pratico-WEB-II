import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoPagar } from './botao-pagar';

describe('BotaoPagar', () => {
  let component: BotaoPagar;
  let fixture: ComponentFixture<BotaoPagar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotaoPagar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotaoPagar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
