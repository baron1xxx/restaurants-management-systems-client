import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent {

  @Output() closeDangerAlert: EventEmitter<any> = new EventEmitter<any>();
  @Input() message: string;

  constructor() {
  }

  close(): void {
    this.closeDangerAlert.emit();
  }
}
