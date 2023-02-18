import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueTypeAddEditComponent } from './issue-type-add-edit.component';

describe('IssueTypeAddEditComponent', () => {
  let component: IssueTypeAddEditComponent;
  let fixture: ComponentFixture<IssueTypeAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssueTypeAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssueTypeAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
