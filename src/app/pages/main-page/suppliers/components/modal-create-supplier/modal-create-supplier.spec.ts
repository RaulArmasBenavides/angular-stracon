import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateSupplier } from './modal-create-supplier';

describe('ModalCreateSupplier', () => {
  let component: ModalCreateSupplier;
  let fixture: ComponentFixture<ModalCreateSupplier>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCreateSupplier]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCreateSupplier);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
