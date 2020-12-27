import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {AuthMethod} from '../../../../enum/auth-method.enum';
import {takeUntil} from 'rxjs/operators';
import {ApiResponse} from '../../../../interface/api-response.interfase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  private unsubscribe: Subject<void> = new Subject<void>();

  private title = 'Login';
  private isLoading = false;
  private errorMessage: string;
  private successMessage: string;
  private loginForm: FormGroup;

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }


  constructor(
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.buildLoginFormGroup();
  }

  registration(): void {
    this.isLoading = true;
    const {email, password} = this.loginForm.value;

    this.authService.login({
      email,
      password,
      authMethod: AuthMethod.LOCAL
    })
      .pipe(
        takeUntil(this.unsubscribe)
      )
      .subscribe((response: ApiResponse) => {
        if (!response.error) {
          console.log(response);
        }
      }, (({error: {message}}) => {
        this.setErrorMessage(message);
      }));
  }

  buildLoginFormGroup(): FormGroup {
    return new FormGroup({
      password: new FormControl(null,
        [
          Validators.required,
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#$^+=!*()@%&]).{8,}$')
        ]),
      email: new FormControl(null,
        [
          Validators.required,
          Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$')
        ])
    });
  }

  setErrorMessage(message: string): void {
    this.isLoading = false;
    this.successMessage = '';
    this.errorMessage = message;
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
