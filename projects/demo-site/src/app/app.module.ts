import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatNativeDateModule } from '@angular/material/core'
import { NgxMatDatepickerSimpleFormattingModule } from 'ngx-mat-datepicker-simple-formatting';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaskDateModule } from '@binarykits/ngx-formcontrol-companion/mask-date';
import { NgxMaskModule } from 'ngx-mask';
import { DateInputComponent } from './pages/date-input/date-input.component';
import { FormcontrolCompanionComponent } from './pages/formcontrol-companion/formcontrol-companion.component'

@NgModule({
  declarations: [
    AppComponent,
    DateInputComponent,
    FormcontrolCompanionComponent,
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
    NgxMaskModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
