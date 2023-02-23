import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProjectSettingComponent} from "./project-setting.component";
import {ProjectInfoComponent} from "./containers/project-info/project-info.component";
import {ProjectBoardComponent} from "./containers/project-board/project-board.component";
import {IssueTypesComponent} from "./containers/issue-types/issue-types.component";
import {ProjectUsersComponent} from "./containers/project-users/project-users.component";
import {BoardAddEditComponent} from "./containers/board-add-edit/board-add-edit.component";
import {IssueTypeAddEditComponent} from "./containers/issue-type-add-edit/issue-type-add-edit.component";
import {ProjectEpicsComponent} from "./containers/project-epics/project-epics.component";
import {ProjectEpicAddEditComponent} from "./containers/project-epic-add-edit/project-epic-add-edit.component";

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
      children: [
        {
          path: '',
          component: IssueTypesComponent
        },
        {
          path: 'add',
          component: IssueTypeAddEditComponent
        },
        {
          path: 'edit/:id',
          component: IssueTypeAddEditComponent
        }
      ]
    },
    {
      path: 'epics',
      children: [
        {
          path: '',
          component: ProjectEpicsComponent
        },
        {
          path: 'add',
          component: ProjectEpicAddEditComponent
        },
        {
          path: 'edit/:id',
          component: ProjectEpicAddEditComponent
        }
      ]
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
