import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-button-loading',
  templateUrl: './button-loading.component.html',
  styleUrls: ['./button-loading.component.css']
})
export class ButtonLoadingComponent implements OnInit {

  @Input() title: string;
  @Input() loading: boolean;
  @Input() valid: boolean;

  constructor() {
  }

  ngOnInit() {
  }
}
