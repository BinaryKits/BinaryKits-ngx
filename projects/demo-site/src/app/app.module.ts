import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatNativeDateModule } from '@angular/material/core'
import { NgxMatDatepickerSimpleFormattingModule } from '@binarykits/ngx-mat-datepicker-simple-formatting';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaskDateModule } from '@binarykits/ngx-form-kit/mask-date';
import { NgxMaskModule } from 'ngx-mask';
import { DateInputComponent } from './pages/date-input/date-input.component';
import { AsPipesModule } from '@binarykits/ngx-form-kit/pipes';
import { NgxFormKitDemoComponent } from './pages/ngx-form-kit-demo/ngx-form-kit-demo.component';

@NgModule({
  declarations: [
    AppComponent,
    DateInputComponent,
    NgxFormKitDemoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    NgxMatDatepickerSimpleFormattingModule,
    MaskDateModule,
    NgxMaskModule.forRoot(),
    AsPipesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
