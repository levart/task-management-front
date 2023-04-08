import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AuthStateModel, checkLogin} from "./store/auth";

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit{
  title = 'task-management-front';

  constructor(
    private store: Store<{auth: AuthStateModel}>
  ) {

  }

  ngOnInit(): void {
    this.store.dispatch(checkLogin());
  }
}
