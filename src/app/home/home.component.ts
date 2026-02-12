import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentService } from '../service/student.service';
import { start } from 'node:repl';
import { PaginatedStudent } from '../model/paginatedStudent';
import { MatDialog } from '@angular/material/dialog';
import { GenerateExcelModalComponent } from './modal/generate-excel-modal/generate-excel-modal.component';
import { UploadFileModalComponent } from './modal/upload-file-modal/upload-file-modal.component';
import { ExcelService } from '../service/excel.service';
import { CsvService } from '../service/csv.service';
import { Student } from '../model/student';
import { EditStudentModalComponent } from './modal/edit-student-modal/edit-student-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  providers: [StudentService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  visibleStudentData : any[] = [];
  students: any[] = [];
  paginatedStudent: PaginatedStudent = <PaginatedStudent>{};
  currentPage = 0;
  pageSize : number = 5;
  itemsPerPageOptions = [5, 10, 20, 50, 100];
  selectAllItems: boolean = false;
  selectedItems: any[] = [];
  sortColumn: string = 'studentId';
  sortDirection: 'asc' | 'desc' = 'asc';
  totalPages = 0;
  convertToCSV: boolean = false;
  uploadCSVData: boolean = false;

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private studentService: StudentService,
    private dialog: MatDialog,
    private excelService: ExcelService,
    private csvService: CsvService,
    private snackBar: MatSnackBar
  ) {
    
  }
  

  ngOnInit() {
    this.getAllStudentData();
    this.getPaginatedStudents(this.currentPage, this.pageSize, "studentId", this.sortDirection);
  }

  generateExcelFile() {
    const dialogRef = this.dialog.open(GenerateExcelModalComponent);
  
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed', result);
    //   if (result.successful) {
    //     this.loadData();
    //   }
    // });
  }

  uploadExcelFileToConvertToCsv(type: string) {
    const dialogRef = this.dialog.open(UploadFileModalComponent, {
      data: {
        convertToCSV: type === 'convert' ? true : false,
        uploadToSystem: type === 'upload' ? true : false
      }
    });

    if(this.uploadCSVData){
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed', result);
        if (result.successful) {
          this.getPaginatedStudents(this.currentPage, this.pageSize, "studentId", this.sortDirection);
        }
      });
    }
    
  }

  getAllStudentData() {
    this.studentService.getAllStudents().subscribe({
      
      next: (studentsData) => {
        this.students = studentsData;
        // this.getVisibleStudents();
      },
      error: (err) => console.error('Failed to load students', err)
    });
  }

  getPaginatedStudents(currPage: number, pageSize: number, sortColumn: string, sortDir: string) {
    this.studentService.getStudentsWithPaginationAndSorting(currPage, pageSize, sortColumn, sortDir)
    .subscribe({
      next:(paginatedData) => {
        console.log("Paginated Data: ", paginatedData);
        this.visibleStudentData = paginatedData.content;
        this.totalPages = paginatedData.totalPages;
        // this.getVisibleStudents();
        this.cdr.detectChanges();
      }
    });
  }

  addStudent(data: any = {}) {
    const row = {
      id: data.id || '',
      firstName: data.first || '',
      lastName: data.last || '',
      className: data.class || '',
      score: data.score || 0
    };
    this.students.push(row);
  }

  removeStudent(student: any) {
    console.log("Student Data: ", student)
    this.studentService.deleteStudentById(student.studentId).subscribe({
      next: () => {
        this.snackBar.open('Student Data removed successfully', 'Close', {
          duration: 5000,
          horizontalPosition: "end",
          panelClass: "notif-success"
        });

        this.getPaginatedStudents(this.currentPage, this.pageSize, "studentId", this.sortDirection);
      }
    });
    
    
  }

  editStudent(student: any) {
    console.log("Student Data: ", student)
    const dialogRef = this.dialog.open(EditStudentModalComponent, {
      data: {
        studentData: student
      }
    });

    if(this.uploadCSVData){
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed', result);
        if (result.successful) {
          this.getPaginatedStudents(this.currentPage, this.pageSize, "studentId", this.sortDirection);
        }
      });
    }
  }

  getVisibleStudents() {
    
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.visibleStudentData = this.students.slice(startIndex, startIndex + Number(this.pageSize));
  }

  

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;

      this.getPaginatedStudents(this.currentPage - 1, this.pageSize, this.sortColumn, this.sortDirection);
      this.cdr.detectChanges();
    }
  }

  selectStudents(index: number, selectAllItems: boolean) {
    if (selectAllItems == true) {

    }
  }

  toggleStudentSelection(index: any) {
    console.log("Selected Item: ", this.selectedItems)
    if (!this.selectedItems.find( x => x == index)) {
      this.selectedItems.push(index);
    }else {
      const selectedIndex = this.selectedItems.findIndex(x => x == index);
      this.selectedItems.splice(selectedIndex, 1);
      console.log("Selected Item after removal: ", this.selectedItems)
    }

  }

  sort(column: string) {
    // If clicking the same column, toggle direction. Otherwise, default to 'asc'.
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  
    this.getPaginatedStudents(this.currentPage, this.pageSize, this.sortColumn, this.sortDirection);
  }

  exportData(event: any) {
    console.log("Event: ", event)
    const type: string = event;
    console.log("Student Data: ", this.students);
    if (type === 'excel') {
      this.excelService.exportToExcelFile(this.students).subscribe({
        next: (response) => {
          console.log("File: ", response);
          this.downloadFile(response, 'application/vnd.ms-excel')

        }
      })
    } else if (type === 'csv') {
        this.csvService.exportToCsvFile(this.students).subscribe({
          next: (response) => {
            console.log("File: ", response);
            this.downloadFile(response, 'text/csv')

          }
      })
    } else if (type === 'pdf') {
      this.csvService.exportToPdfFile(this.students).subscribe({
        next: (response) => {
          console.log("File: ", response);
          this.downloadFile(response, 'application/pdf')

        }
    })
  }
  }

  downloadFile(data: BlobPart, dataType: string) {
    const blob = new Blob([data], { type: dataType });
    const url= window.URL.createObjectURL(blob);
    window.open(url);
  }
}
