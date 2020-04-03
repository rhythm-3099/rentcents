import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaydoneComponent } from './paydone.component';

describe('PaydoneComponent', () => {
  let component: PaydoneComponent;
  let fixture: ComponentFixture<PaydoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaydoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaydoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
