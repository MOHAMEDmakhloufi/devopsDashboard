import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleniumComponent } from './selenium.component';

describe('SeleniumComponent', () => {
  let component: SeleniumComponent;
  let fixture: ComponentFixture<SeleniumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeleniumComponent]
    });
    fixture = TestBed.createComponent(SeleniumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
