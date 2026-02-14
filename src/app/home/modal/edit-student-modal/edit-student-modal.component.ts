import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExcelService } from '../../../service/excel.service';
import { CsvService } from '../../../service/csv.service';
import { Student } from '../../../model/student';
import { StudentService } from '../../../service/student.service';
import { LoadingScreenService } from '../../../loading-screen/loading-screen.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-edit-student-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-student-modal.component.html',
  styleUrl: './edit-student-modal.component.scss'
})
export class EditStudentModalComponent {
  student: Student = <Student>{};

  constructor(
    public dialogRef: MatDialogRef<EditStudentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private studentService: StudentService,
    private loadingScreenService: LoadingScreenService
  ) { 
    console.log('Prem Rate: ', data )
    this.student = data.studentData;
  }

  // Event handlers for buttons
  onSave() {
    this.loadingScreenService.isLoading.next(true);
    this.studentService.editStudent(this.student.studentId, this.student).subscribe({
      next: (response) => {
        this.loadingScreenService.isLoading.next(false);
        this.snackBar.open('Data Updated Successfully', 'Close', {
          duration: 5000,
          horizontalPosition: "end",
          panelClass: "notif-success"
        });
        this.dialogRef.close({ successful: false });
      },

      error: (err) => {
        this.loadingScreenService.isLoading.next(false);
        this.snackBar.open(err.error.error, 'Close', {
          duration: 5000,
          horizontalPosition: "end",
          panelClass: "notif-error"
        });
        this.dialogRef.close({ successful: false });

        console.error('Error saving data', err);
        this.dialogRef.close({ successful: false });
      }
    })
   
  }

  onCancel() {
    this.dialogRef.close();
  }
}
