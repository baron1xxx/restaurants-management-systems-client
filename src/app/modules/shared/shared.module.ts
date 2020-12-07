import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonLoadingComponent} from './components/button-loading/button-loading.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [ButtonLoadingComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ButtonLoadingComponent,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class SharedModule {
}
