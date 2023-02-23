import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectEpicAddEditComponent } from './project-epic-add-edit.component';

describe('ProjectEpicAddEditComponent', () => {
  let component: ProjectEpicAddEditComponent;
  let fixture: ComponentFixture<ProjectEpicAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectEpicAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectEpicAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
