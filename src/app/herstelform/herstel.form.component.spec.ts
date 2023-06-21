/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Herstel.formComponent } from './herstel.form.component';

describe('Herstel.formComponent', () => {
  let component: Herstel.formComponent;
  let fixture: ComponentFixture<Herstel.formComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Herstel.formComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Herstel.formComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
