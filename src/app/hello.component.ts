import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-hello',
  template: `
    <span *ngIf="bool" class="bool"></span>
    <span *ngIf="!bool" class="no-bool"></span>
    <button class="action" (click)="ahahahaahKillMe()">ahahahaahKillMe<button>
    <button class="change-data" (click)="changeData()">changeData<button>
  `
})
export class HelloComponent {
  @Input() bool;

  @Input() data;
  @Output() dataChange = new EventEmitter();

  @Output() action = new EventEmitter();

  ahahahaahKillMe() {
    this.action.emit(228);
  }

  changeData() {
    this.dataChange.emit('changed biatch');
  }
}
