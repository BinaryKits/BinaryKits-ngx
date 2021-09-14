import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxMatDatepickerSimpleFormattingDemoComponent } from './pages/ngx-mat-datepicker-simple-formatting-demo/ngx-mat-datepicker-simple-formatting-demo.component';
import { NgxMaskDateDemoComponent } from './pages/ngx-mask-date-demo/ngx-mask-date-demo.component'


const routes: Routes = [{ path: 'ngx-mat-datepicker-simple-formatting-demo', component: NgxMatDatepickerSimpleFormattingDemoComponent },
{ path: 'ngx-mask-date-demo', component: NgxMaskDateDemoComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
