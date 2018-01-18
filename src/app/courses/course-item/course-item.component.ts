import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { CourseDetails } from '../course-details.model';
import { MatDialog } from '@angular/material';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseItemComponent {
  @Input() public courseDetails: CourseDetails;
  @Output() public deleteCourse = new EventEmitter<CourseDetails>();

  constructor(public dialog: MatDialog, private router: Router) {}

  public onDeleteCourseButtonClick() {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '600px',
      data: this.courseDetails
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'Confirm') {
        this.deleteCourse.emit(this.courseDetails);
      }
    });
  }

  public onEditCourseButtonClick() {
    this.router.navigate([`courses/${this.courseDetails.id}`]);
  }

}
