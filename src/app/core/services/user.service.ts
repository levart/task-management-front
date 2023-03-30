import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {Observable} from "rxjs";
import {IUser} from "../interfaces/user";
import {PaginationResponse} from "../interfaces/pagination-response";

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService{


  createUser(data: any) {
    return this.post('users', data);
  }

  getUsers(params = {}): Observable<PaginationResponse<IUser>> {
    return this.get('users', params);
  }


  getAllUsers(): Observable<any> {
    return this.get('users/all');
  }

  getUser(id: number): Observable<IUser> {
    return this.get(`users/${id}`);
  }

  updateUser(data: IUser):Observable<IUser> {
    console.log(data);
    return this.put(`users/${data.id}`, data);
  }

  deleteUser(id: number) {
    return this.delete(`users/${id}`);
  }

  updateUserRoles(params: { userId: number, roleIds: number[] }): Observable<IUser> {
    return this.post(`users/roles`, params);
  }
}
