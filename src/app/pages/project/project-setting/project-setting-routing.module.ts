import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProjectSettingComponent} from "./project-setting.component";
import {ProjectInfoComponent} from "./containers/project-info/project-info.component";
import {ProjectBoardComponent} from "./containers/project-board/project-board.component";
import {IssueTypesComponent} from "./containers/issue-types/issue-types.component";
import {ProjectUsersComponent} from "./containers/project-users/project-users.component";
import {BoardAddEditComponent} from "./containers/board-add-edit/board-add-edit.component";

const routes: Routes = [{
  path: '',
  component: ProjectSettingComponent,
  children: [
    {
      path: '',
      redirectTo: 'info',
      pathMatch: 'full'
    },
    {
      path: 'info',
      component: ProjectInfoComponent
    },
    {
      path: 'boards',
      children: [
        {
          path: '',
          component: ProjectBoardComponent
        },
        {
          path: 'add',
          component: BoardAddEditComponent
        },
        {
          path: 'edit/:id',
          component: BoardAddEditComponent
        }
      ]
    },
    {
      path: 'issue-types',
      component: IssueTypesComponent
    },
    {
      path: 'users',
      component: ProjectUsersComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectSettingRoutingModule {
}
