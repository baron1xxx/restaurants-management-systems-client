import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-button-loading',
  templateUrl: './button-loading.component.html',
  styleUrls: ['./button-loading.component.css']
})
export class ButtonLoadingComponent implements OnInit {

  title = 'Register';
  isLoading = false;

  constructor() {
  }

  ngOnInit() {
  }

  toggleLoading = () => {
    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }

}
