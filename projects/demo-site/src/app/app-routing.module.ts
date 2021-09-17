import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DateInputComponent } from './pages/date-input/date-input.component';
import { FormcontrolCompanionComponent } from './pages/formcontrol-companion/formcontrol-companion.component';


const routes: Routes = [{ path: 'date-input', component: DateInputComponent },
{ path: 'formcontrol-companion', component: FormcontrolCompanionComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
