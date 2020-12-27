import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonLoadingComponent} from './components/button-loading/button-loading.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ErrorMessageComponent} from './components/error-message/error-message.component';
import {SuccessMessageComponent} from './components/success-message/success-message.component';
import {ButtonLinkComponent} from './components/button-link/button-link.component';

@NgModule({
  declarations: [
    ButtonLoadingComponent,
    ErrorMessageComponent,
    SuccessMessageComponent,
    ButtonLinkComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ButtonLoadingComponent,
    ButtonLinkComponent,
    ErrorMessageComponent,
    SuccessMessageComponent
  ],
})
export class SharedModule {
}
