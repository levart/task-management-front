import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService{


  createUser(data: any) {
    return this.post('users', data);
  }

  getUsers() {
    return this.get('users');
  }


  getAllUsers(): Observable<any> {
    return this.get('users/all');
  }

  getUser(id: number) {
    return this.get(`users/${id}`);
  }

  updateUser(id: number, data: any) {
    return this.put(`users/${id}`, data);
  }

  deleteUser(id: number) {
    return this.delete(`users/${id}`);
  }
}
