import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookproductComponent } from './bookproduct.component';

describe('BookproductComponent', () => {
  let component: BookproductComponent;
  let fixture: ComponentFixture<BookproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
