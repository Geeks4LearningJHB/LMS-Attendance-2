import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QRCodeOpenerComponent } from './qrcode-opener.component';

describe('QRCodeOpenerComponent', () => {
  let component: QRCodeOpenerComponent;
  let fixture: ComponentFixture<QRCodeOpenerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QRCodeOpenerComponent]
    });
    fixture = TestBed.createComponent(QRCodeOpenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
