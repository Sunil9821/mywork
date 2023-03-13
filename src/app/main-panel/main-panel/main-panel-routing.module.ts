import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesListComponent } from 'src/app/modules/employees-list/employees-list.component';
import { NewEmployeeComponent } from 'src/app/modules/new-employee/new-employee.component';
import { MainPanelComponent } from './main-panel.component';

const routes: Routes = [
  /* {path: '', component:MainPanelComponent, 
    children:[
      {path: '', component:EmployeesListComponent},
      {path: 'new-employee', component:NewEmployeeComponent},
    ]
  } */
  {path: '', component:EmployeesListComponent},
  {path: 'new-employee/:eid', component:NewEmployeeComponent},
  {path: 'new-employee', component:NewEmployeeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainPanelRoutingModule { }
