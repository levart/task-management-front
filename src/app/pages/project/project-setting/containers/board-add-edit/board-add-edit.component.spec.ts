import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardAddEditComponent } from './board-add-edit.component';

describe('BoardAddEditComponent', () => {
  let component: BoardAddEditComponent;
  let fixture: ComponentFixture<BoardAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
