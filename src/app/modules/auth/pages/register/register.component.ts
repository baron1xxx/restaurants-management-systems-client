import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {ApiResponse} from '../../../../interface/api-response.interfase';
import {AuthMethod} from '../../../../enum/auth-method.enum';
import {Roles} from '../../../../enum/roles.enum';
import {Register} from '../../../../interface/register.interface';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  private unsubscribe: Subject<void> = new Subject<void>();

  private title = 'Register';
  private isLoading = false;
  private errorMessage: string;
  private successMessage: string;
  private registrationForm: FormGroup;

  get firstName() {
    return this.registrationForm.get('firstName');
  }

  get lastName() {
    return this.registrationForm.get('lastName');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  get role() {
    return this.registrationForm.get('role');
  }

  constructor(
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.registrationForm = this.buildRegistrationFormGroup();
  }

  registration(): void {
    this.isLoading = true;
    const {firstName, lastName, email, password} = this.registrationForm.value;

    this.authService.registration({
      firstName,
      lastName,
      email,
      password,
      role: this.role ? Roles.OWNER : Roles.CUSTOMER,
      authMethod: AuthMethod.LOCAL
    })
      .pipe(
        takeUntil(this.unsubscribe)
      )
      .subscribe(({data, error}: ApiResponse) => {
        if (!error) {
          this.setSuccessMessage(data);
        }
      }, (({error: {message}}) => {
        this.setErrorMessage(message);
      }));
  }

  buildRegistrationFormGroup(): FormGroup {
    return new FormGroup({
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

  setErrorMessage(message: string): void {
    this.isLoading = false;
    this.successMessage = '';
    this.errorMessage = message;
  }

  setSuccessMessage(data: any): void {
    this.isLoading = false;
    this.errorMessage = '';
    this.successMessage = data;
    this.registrationForm.reset();
  }

  closeErrorMessage(): void {
    this.errorMessage = '';
  }

  closeSuccessMessage(): void {
    this.successMessage = '';
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
