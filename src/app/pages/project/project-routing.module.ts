import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProjectListComponent} from "./project-list/project-list.component";
import {ProjectAddEditComponent} from "./project-add-edit/project-add-edit.component";

const routes: Routes = [
  {
    path: '',
    component: ProjectListComponent,
  },
  {
    path: 'add',
    component: ProjectAddEditComponent
  },
  {
    path: 'edit/:id',
    component: ProjectAddEditComponent
  },
  {
    path: 'setting',
    loadChildren: () => import('./project-setting/project-setting.module').then(m => m.ProjectSettingModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
