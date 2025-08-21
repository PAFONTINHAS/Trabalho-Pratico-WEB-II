import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Resgatar } from './resgatar/resgatar';

describe('Resgatar', () => {
  let component: Resgatar;
  let fixture: ComponentFixture<Resgatar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Resgatar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Resgatar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
