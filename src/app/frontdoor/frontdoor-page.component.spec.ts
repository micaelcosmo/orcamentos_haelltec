import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontdoorPage } from './frontdoor-page.component';

describe('TabsPage', () => {
  let component: FrontdoorPage;
  let fixture: ComponentFixture<FrontdoorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FrontdoorPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontdoorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
