import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {switchMap, takeUntil} from 'rxjs/operators';
import {AuthService} from '../../services/auth.service';
import {ApiResponse} from '../../../../interface/api-response.interfase';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit, OnDestroy {

  private unsubscribe: Subject<void> = new Subject<void>();

  private errorMessage: string;
  private successMessage: string;
  private activateError: boolean;
  private isLoading = false;
  private reactivateForm: FormGroup;

  get email() {
    return this.reactivateForm.get('email');
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
  ) {
  }

  ngOnInit() {
    this.activate();
    this.reactivateForm = this.buildReactivateFormGroup();
  }

  activate(): void {
    this.activatedRoute.params.pipe(
      switchMap(({activateToken}) => {
        return this.authService.activateAccount(activateToken);
      }),
      takeUntil(this.unsubscribe)
    ).subscribe(({data, error}: ApiResponse) => {
      if (!error) {
        this.setSuccessMessage(data);
      }
    }, (({error: {message}}) => {
      this.setErrorMessage(message);
    }));
  }

  reactivateAccount() {
    this.isLoading = true;
    const {email} = this.reactivateForm.value;
    this.authService.refreshActivateAccount(email).subscribe(({data, error}: ApiResponse) => {
      this.isLoading = false;
      if (!error) {
        console.log(data);
        this.setSuccessMessage(data);
      }
    }, (({error: {message}}) => {
      this.setErrorMessage(message);
    }));
  }

  buildReactivateFormGroup(): FormGroup {
    return new FormGroup({
      email: new FormControl(null,
        [
          Validators.required,
          Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$')
        ])
    });
  }

  setErrorMessage(message: string): void {
    console.log(message);
    this.successMessage = '';
    this.errorMessage = message;
    this.activateError = true;
  }

  setSuccessMessage(data: any): void {
    console.log(data);
    this.errorMessage = '';
    this.successMessage = data;
    this.activateError = false;
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
