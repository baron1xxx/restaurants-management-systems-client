import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-success-message',
  templateUrl: './success-message.component.html',
  styleUrls: ['./success-message.component.css']
})
export class SuccessMessageComponent {

  @Output() closeSuccessAlert: EventEmitter<any> = new EventEmitter<any>();
  @Input() message: string;

  constructor() {
  }

  close(): void {
    this.closeSuccessAlert.emit();
  }

}
