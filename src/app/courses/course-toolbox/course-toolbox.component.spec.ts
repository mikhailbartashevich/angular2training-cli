import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseToolboxComponent } from './course-toolbox.component';

describe('CourseToolboxComponent', () => {
  let component: CourseToolboxComponent;
  let fixture: ComponentFixture<CourseToolboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseToolboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseToolboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
