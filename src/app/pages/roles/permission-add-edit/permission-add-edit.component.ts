import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngrx/store";
import {RoleState} from "../store";
import {
  clearPermissionsByRole,
  loadPermissions,
  loadPermissionsByRole,
  setPermissions
} from "../store/permission/permission.actions";
import {getPermissions, getRolePermissions} from "../store/permission/permission.selectors";

@Component({
  selector: 'app-permission-add-edit',
  templateUrl: './permission-add-edit.component.html',
  styleUrls: ['./permission-add-edit.component.scss']
})
export class PermissionAddEditComponent implements OnInit, OnDestroy {
  permissionGroups$ = this.store.select(getPermissions);
  roleId!: string

  permissions: Set<number> = new Set<number>();

  constructor(
    private store: Store<RoleState>,
    private route: ActivatedRoute
  ) {
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearPermissionsByRole())
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['roleId']) {
        this.roleId = params['roleId'];
        this.getPermissionsByRole()
      }
    })

    this.getPermissions()

    this.store.select(getRolePermissions)
      .subscribe(permissions => {
        permissions && permissions.length && permissions.forEach((p: any) => this.permissions.add(p))
      })
  }

  getPermissionsByRole() {
    this.store.dispatch(loadPermissionsByRole({roleId: this.roleId}));
  }

  getPermissions() {
    this.store.dispatch(loadPermissions());
  }


  checkPermission(permission: any) {
    this.permissions.has(permission.id) ? this.permissions.delete(permission.id) : this.permissions.add(permission.id)
  }

  save() {
    this.store.dispatch(setPermissions({roleId: this.roleId, permissions: Array.from(this.permissions)}))
  }
}
