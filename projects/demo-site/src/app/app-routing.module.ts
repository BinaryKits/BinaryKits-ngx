import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DateInputComponent } from './pages/date-input/date-input.component';


const routes: Routes = [{ path: 'date-input', component: DateInputComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
