import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditSupplier } from './modal-edit-supplier';

describe('ModalEditSupplier', () => {
  let component: ModalEditSupplier;
  let fixture: ComponentFixture<ModalEditSupplier>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEditSupplier]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditSupplier);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
