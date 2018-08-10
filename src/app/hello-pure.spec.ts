import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { HelloComponent } from './hello.component';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { DebugElement } from '@angular/core';

describe('pure', function () {
  let componentFixture: ComponentFixture<HelloComponent>,
    component: HelloComponent,
    de: DebugElement;

  beforeEach(function () {
   TestBed.configureTestingModule({
      imports: [ CommonModule ],
      declarations: [
        HelloComponent
      ]
    });
  });

  beforeEach(function () {
    componentFixture = TestBed.createComponent(HelloComponent);
    de = componentFixture.debugElement;
    component = de.componentInstance;

    componentFixture.detectChanges();
  });

  it('initial', () => {
    expect(component).toBeDefined();
  });

  it('bool', function () {
    component.bool = true;

    componentFixture.detectChanges();

    expect(de.query(By.css('span.bool'))).not.toBeNull();
    expect(de.query(By.css('span.no-bool'))).toBeNull();
  });

  it('no bool', function () {
    component.bool = false;

    componentFixture.detectChanges();

    expect(de.query(By.css('span.bool'))).toBeNull();
    expect(de.query(By.css('span.no-bool'))).not.toBeNull();
  });

  it('output', () => {
    const spy = jasmine.createSpy();

    component.action.subscribe(spy);

    de.query(By.css('button.action')).triggerEventHandler('click', null);

    expect(spy).toHaveBeenCalledWith(228);
  });

  describe('two-way data-binding', () => {
    it('data is changed', () => {
      const spy = jasmine.createSpy();

      component.dataChange.subscribe(spy);

      de.query(By.css('button.change-data')).triggerEventHandler('click', null);

      expect(spy).toHaveBeenCalledWith('changed biatch');
    });
  });
});
