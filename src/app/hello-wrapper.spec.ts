import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { HelloComponent } from './hello.component';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Component, ViewChild, DebugElement } from '../../node_modules/@angular/core';

describe('wrapper', function () {
  let componentFixture: ComponentFixture<TestHostComponent>,
      component: TestHostComponent,
      de: DebugElement,
      helloDe: DebugElement;

  @Component({
    template: `
      <app-hello
        [bool]="boolProp"
        (action)="onAction($event)"
        [(data)]="dataProp"
      >
      </app-hello>
    `
  })
  class TestHostComponent {
    boolProp;

    dataProp = '322';

    @ViewChild(HelloComponent) hello;

    onAction() {}
  }

  beforeEach(function () {
    TestBed.configureTestingModule({
      imports: [ CommonModule ],
      declarations: [
        HelloComponent,
        TestHostComponent
      ]
    });
  });

  beforeEach(function () {
    componentFixture = TestBed.createComponent(TestHostComponent);
    de = componentFixture.debugElement;
    component = de.componentInstance;

    helloDe = de.query(By.css('app-hello'));

    componentFixture.detectChanges();
  });

  it('initial', () => {
    expect(component).toBeDefined();
  });

  it('bool', function () {
    component.boolProp = true;

    componentFixture.detectChanges();

    expect(de.query(By.css('span.bool'))).not.toBeNull();
    expect(de.query(By.css('span.no-bool'))).toBeNull();
  });

  it('no bool', function () {
    component.boolProp = false;

    componentFixture.detectChanges();

    expect(de.query(By.css('span.bool'))).toBeNull();
    expect(de.query(By.css('span.no-bool'))).not.toBeNull();
  });

  it('output', () => {
    spyOn(component, 'onAction');

    helloDe.query(By.css('button.action')).triggerEventHandler('click', null);

    expect(component.onAction).toHaveBeenCalledWith(228);
  });

  describe('two-way data-binding', () => {
    it('initial value', () => {
      expect(component.hello.data).toBe('322');
    });

    it('data is changed', () => {
      helloDe.query(By.css('button.change-data')).triggerEventHandler('click', null);

      expect(component.dataProp).toBe('changed biatch');
    });
  });
});
