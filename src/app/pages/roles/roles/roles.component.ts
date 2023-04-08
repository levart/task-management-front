import {Component, OnInit} from '@angular/core';
import {DataSource} from "@angular/cdk/collections";
import {MatTableDataSource} from "@angular/material/table";
import {IUser} from "../../../core/interfaces/user";
import {Subject} from "rxjs";
import {IRole} from "../../../core/interfaces/role";
import {RoleService} from "../../../core/services/role.service";
import {PageEvent} from "@angular/material/paginator";
import {Store} from "@ngrx/store";
import {RoleStateModel} from "../store/role/role.reducer";
import {getRoles, getRoleTotal} from "../store/role/role.selectors";
import {loadRoles} from "../store/role/role.actions";

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit{
  displayedColumns = ['id', 'name', 'createdAt', 'actions'];

  dataSource = new MatTableDataSource<IRole>();

  sub$ = new Subject();

  pageIndex  = 0;
  total$ = this.store.select(getRoleTotal);
  pageSize = 10;



  constructor(
    private store: Store<{role: RoleStateModel}>,
  ) {

  }

  ngOnInit(): void {

    this.store.select(getRoles)
      .pipe()
      .subscribe(roles => {
        this.dataSource.data = roles;
      })
    this.getRoles();
  }

  getRoles() {
    this.store.dispatch(loadRoles({
      page: this.pageIndex + 1,
      limit: this.pageSize
    }))
  }

  addRole(id?: number) {

  }

  delete(id: number) {

  }

  pageEvent($event: PageEvent) {
    console.log($event)
    this.pageIndex = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this.getRoles()
  }

  setPermissions(id: number) {
    console.log(id)
  }
}
