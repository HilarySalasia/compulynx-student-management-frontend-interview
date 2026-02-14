import { CommonModule } from '@angular/common';
import { Component, Inject, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventEmitter } from 'stream';
import { ExcelService } from '../../../service/excel.service';
import { GlobalServiceService } from '../../../service/global-service.service';
import { LoadingScreenService } from '../../../loading-screen/loading-screen.service';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-generate-excel-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule],
  templateUrl: './generate-excel-modal.component.html',
  styleUrl: './generate-excel-modal.component.scss'
})
export class GenerateExcelModalComponent {
  // @Output() saveRate = new EventEmitter();
  // @Output() cancelRate = new EventEmitter();
  numberOfRows = 0;
  loading = new Subject<boolean>();

  constructor(
    public dialogRef: MatDialogRef<GenerateExcelModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private excelService: ExcelService,
    private loadingScreenService: LoadingScreenService
  ) { 
    // console.log('Prem Rate: ', data.premRate )
    // this.ordPremRate = data.premRate;
  }

  // Close the dialog
  closeDialog() {
    this.dialogRef.close();
  }

  // Event handlers for buttons
  onSave() {
    // Validate input fields here

    this.loadingScreenService.isLoading.next(true);
    // console.log("read pmas: ", this.lmsPremiumMasks.pmasCode);
    this.excelService.generateExcelFile(this.numberOfRows).subscribe({
      next:(result) => {
        console.log("result: ", result)
        this.loadingScreenService.isLoading.next(false);
        this.snackBar.open(result.text.toString(), 'Close', {
          duration: 3000,
          horizontalPosition: "end",
          panelClass: "notif-success"
        });
        // this.globalService.(result);
        
      this.dialogRef.close({ successful: true });
      },

      error: (error) => {
        this.snackBar.open(error, 'Close', {
          duration: 3000,
          horizontalPosition: "end",
          panelClass: "notif-error"
        });
        this.dialogRef.close({ successful: false });

        console.error('Error saving data', error);
        this.dialogRef.close({ successful: false });
      }
      
    });
  
  }

  onCancel() {
    this.dialogRef.close();
  }

}
