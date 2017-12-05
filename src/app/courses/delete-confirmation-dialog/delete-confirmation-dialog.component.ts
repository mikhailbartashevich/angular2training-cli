import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CourseDetails } from '../course-details.model';

@Component({
  selector: 'app-delete-confirmation-dialog',
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrls: ['./delete-confirmation-dialog.component.css']
})
export class DeleteConfirmationDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: CourseDetails) { }

  public onConfirmButtonClick() {
    this.dialogRef.close('Confirm');
  }
}
