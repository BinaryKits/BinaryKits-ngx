import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxMatDatepickerSimpleFormattingDemoComponent } from './pages/ngx-mat-datepicker-simple-formatting-demo/ngx-mat-datepicker-simple-formatting-demo.component';


const routes: Routes = [{ path: 'ngx-mat-datepicker-simple-formatting-demo', component: NgxMatDatepickerSimpleFormattingDemoComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
