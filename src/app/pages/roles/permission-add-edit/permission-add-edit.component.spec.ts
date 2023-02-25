import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionAddEditComponent } from './permission-add-edit.component';

describe('PermissionAddEditComponent', () => {
  let component: PermissionAddEditComponent;
  let fixture: ComponentFixture<PermissionAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermissionAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermissionAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
