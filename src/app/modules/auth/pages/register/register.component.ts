import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private registrationForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.registrationForm = new FormGroup({
      firstName: new FormControl(null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern('^[a-zA-Zа-яА-Я\\s]+$')
        ]),
      lastName: new FormControl(null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern('^[a-zA-Zа-яА-Я\\s]+$')
        ]),
      password: new FormControl(null,
        [
          Validators.required,
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#$^+=!*()@%&]).{8,}$')
        ]),
      email: new FormControl(null,
        [
          Validators.required,
          Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$')
        ]),
      role: new FormControl(false)
    });
  }

  registration() {
    console.log(this.registrationForm.value);
  }
}
