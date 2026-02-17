import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExcelService } from '../../../service/excel.service';
import { Observable, Subject } from 'rxjs';
import { CsvService } from '../../../service/csv.service';
import { LoadingScreenService } from '../../../loading-screen/loading-screen.service';

@Component({
  selector: 'app-upload-file-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  templateUrl: './upload-file-modal.component.html',
  styleUrl: './upload-file-modal.component.scss'
})
export class UploadFileModalComponent {
// @Output() saveRate = new EventEmitter();
  // @Output() cancelRate = new EventEmitter();
  numberOfRows = 0;
  fileToUpload: File | null = null;
  convert: boolean = false;
  upload: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<UploadFileModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private excelService: ExcelService,
    private csvService: CsvService,
    private loadingScreenService: LoadingScreenService
  ) { 
    console.log('Prem Rate: ', data )
    this.convert = data.convertToCSV;
    this.upload = data.uploadToSystem;
  }

  // Close the dialog
  closeDialog() {
    this.dialogRef.close();
  }

  // Event handlers for buttons
  onSave() {
    if (this.fileToUpload) {
      this.postFile(this.fileToUpload);
    }
   
  }

  onCancel() {
    this.dialogRef.close();
  }

  handleFileInput(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;
  
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      
      if (this.convert) {
        const allowedTypes = [
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'application/vnd.ms-excel'
        ];
    
        const isExcel = allowedTypes.includes(file.type);
        
        const fileName = file.name.toLowerCase();
        const isExcelExt = fileName.endsWith('.xlsx') || fileName.endsWith('.xls');
    
        if (isExcel || isExcelExt) {
          this.fileToUpload = file;
          console.log('File accepted:', file.name);
        } else {
          this.fileToUpload = null;
          element.value = ''; 
          this.snackBar.open('Invalid file type. Please upload an Excel file (.xlsx or .xls).', 'Close', {
            duration: 3000,
            horizontalPosition: "end",
            panelClass: "notif-error"
          });
        }
      } else if (this.upload) {
        const allowedTypes = [
          'text/csv', 
          'application/csv'
        ];
        const fileName = file.name.toLowerCase();
        const isCsv = allowedTypes.includes(file.type) || 
                             fileName.endsWith('.csv');
    
        if (isCsv) {
          this.fileToUpload = file;
          console.log('File accepted:', file.name);
        } else {
          this.fileToUpload = null;
          element.value = ''; 
          this.snackBar.open('Invalid file type. Please upload an CSV file (.csv).', 'Close', {
            duration: 3000,
            horizontalPosition: "end",
            panelClass: "notif-error"
          });
        }
      }
    }
      
  }

  postFile(fileToUpload: File) {
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);

    if (this.convert) {
      this.excelService.convertExcelToCsv(fileToUpload).subscribe({
        next: (result) => {
          this.snackBar.open(result.text.toString(), 'Close', {
            duration: 5000,
            horizontalPosition: "end",
            panelClass: "notif-success"
          });
          this.dialogRef.close({ successful: false });
        },

        error: (err) => {
          this.snackBar.open(err.error.error, 'Close', {
            duration: 5000,
            horizontalPosition: "end",
            panelClass: "notif-error"
          });
          console.error('Error saving data', err);
          this.dialogRef.close({ successful: false });
        }
      });
    } else if (this.upload) {
      this.csvService.uploadStudentsData(fileToUpload).subscribe({
        next: (result) => {
          this.snackBar.open('Data Uploaded Successfully', 'Close', {
            duration: 5000,
            horizontalPosition: "end",
            panelClass: "notif-success"
          });
          this.dialogRef.close({ successful: false });
        },

        error: (err) => {
          this.snackBar.open(err.error.error, 'Close', {
            duration: 5000,
            horizontalPosition: "end",
            panelClass: "notif-error"
          });
          console.error('Error saving data', err);
          this.dialogRef.close({ successful: false });
        }
      });
    }
  }
}
