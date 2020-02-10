import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  styleUrls: ['./alert.component.css'],
  templateUrl: './alert.component.html'
})
export class AlertComponent {
  @Input() message: string;
  @Output() closeAlert = new EventEmitter<void>();

  onClose() {
    this.closeAlert.emit();
  }
}
