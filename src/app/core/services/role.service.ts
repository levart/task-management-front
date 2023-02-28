import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {IRole} from "../interfaces/role";
import {Observable} from "rxjs";
import {PaginationResponse} from "../interfaces/pagination-response";

@Injectable({
  providedIn: 'root'
})
export class RoleService extends BaseService{

  getRoles(params = {}): Observable<PaginationResponse<IRole>> {
    return this.get('role', params);
  }
  getAllRoles(): Observable<IRole[]> {
    return this.get('role/all');
  }

  getRole(id: string): Observable<any> {
    return this.get(`role/${id}`);
  }

  createRole(role: IRole) {
    return this.post('role', role);
  }

  updateRole(role: IRole) {
    return this.put(`role/${role.id}`, role);
  }

  deleteRole(id: number) {
    return this.delete(`role/${id}`);
  }

  getPermissions(): Observable<any[]> {
    return this.get('role/permission');
  }

  setPermissions(params: {
                   roleId: string, permissions: number[]
                 }): Observable<any> {
    return this.post(`role/permissions`, params);
  }

  getMyRoles(): Observable<any> {
    return this.get(`role/my`);
  }
}
