import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DateInputComponent } from './pages/date-input/date-input.component';
import { NgxFormKitDemoComponent } from './pages/ngx-form-kit-demo/ngx-form-kit-demo.component';


const routes: Routes = [
  { path: 'ngx-mat-datepicker-simple-formatting', component: DateInputComponent },
  { path: 'ngx-form-kit', component: NgxFormKitDemoComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
