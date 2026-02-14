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
import { response } from 'express';
import { LoadingScreenService } from '../loading-screen/loading-screen.service';

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
  currentPage = 1;
  pageSize : number = 5;
  itemsPerPageOptions = [5, 10, 20, 50, 100];
  selectAllItems: boolean = false;
  selectedItems: any[] = [];
  sortColumn: string = 'studentId';
  sortDirection: 'asc' | 'desc' = 'asc';
  totalPages = 0;
  convertToCSV: boolean = false;
  uploadCSVData: boolean = false;
  studentId: number = 0;
  selectedClass: string = '';

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private studentService: StudentService,
    private dialog: MatDialog,
    private excelService: ExcelService,
    private csvService: CsvService,
    private snackBar: MatSnackBar,
    private loadingScreenService: LoadingScreenService
  ) {
    
  }
  

  ngOnInit() {
    this.getPaginatedStudents(this.currentPage-1, this.pageSize, "studentId", this.sortDirection);
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

  removeStudent(student: any) {
    this.loadingScreenService.isLoading.next(true);
    this.studentService.deleteStudentById(student.studentId).subscribe({
      next: () => {
        this.loadingScreenService.isLoading.next(false);
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

  searchByStudentId() {
    this.loadingScreenService.isLoading.next(true);
    this.studentService.getStudentById(this.studentId).subscribe({
      next: (response) => {
        this.loadingScreenService.isLoading.next(false);
        this.visibleStudentData = [];
        this.visibleStudentData.push(response);
      }

    })
  }

  filterByClass() {
    if (this.selectedClass === 'AllClassess' || this.selectedClass === ''){
      this.getPaginatedStudents(this.currentPage - 1, this.pageSize, "studentId", this.sortDirection);
    } else {
      this.studentService.getStudentsByClassName(this.selectedClass, this.currentPage, this.pageSize).subscribe({
        next: (response) => {
          this.visibleStudentData = [];
          this.visibleStudentData = response.content;
          this.totalPages = response.totalPages;
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
      
      // if (this.selectedClass !== 'AllClassess') {
        
      // }
      this.filterByClass();

      // this.getPaginatedStudents(this.currentPage - 1, this.pageSize, this.sortColumn, this.sortDirection);
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
      this.loadingScreenService.isLoading.next(true);
      this.excelService.exportToExcelFile().subscribe({
        next: (response) => {
          this.loadingScreenService.isLoading.next(false);
          console.log("File: ", response);
          this.downloadFile(response, 'student_data', 'application/vnd.ms-excel')
        },

        error: (err) => {
          this.loadingScreenService.isLoading.next(false);
          this.snackBar.open(err.error.error, 'Close', {
            duration: 5000,
            horizontalPosition: "end",
            panelClass: "notif-error"
          });
  
          console.error('Error saving data', err);
        }
      })
    } else if (type === 'csv') {
      this.loadingScreenService.isLoading.next(true);
        this.csvService.exportToCsvFile().subscribe({
          next: (response) => {
            this.loadingScreenService.isLoading.next(false);
            console.log("File: ", response);
            this.downloadFile(response, 'student_data','text/csv')

          },
          error: (err) => {
            this.loadingScreenService.isLoading.next(false);
            this.snackBar.open(err.error.error, 'Close', {
              duration: 5000,
              horizontalPosition: "end",
              panelClass: "notif-error"
            });
    
            console.error('Error saving data', err);
          }
      })
    } else if (type === 'pdf') {
      this.csvService.exportToPdfFile().subscribe({
        next: (response) => {
          console.log("File: ", response);
          this.downloadFile(response, 'student_data', 'application/pdf')

        },
        error: (err) => {
          this.snackBar.open(err.error.error, 'Close', {
            duration: 5000,
            horizontalPosition: "end",
            panelClass: "notif-error"
          });
  
          console.error('Error saving data', err);
        }
    })
  }
  }

  downloadFile(data: BlobPart, fileName: string, dataType: string) {
    // 1. Create the Blob with the correct MIME type
    console.log("Blob Data: ", data);
    const blob = new Blob([data], { type: dataType });
    
    // 2. Create a hidden link element
    const link = document.createElement('a');
    const url = window.URL.createObjectURL(blob);
    
    // 3. Set the download attributes
    link.href = url;
    link.download = fileName; // Crucial: This tells the browser to save, not open
    
    // 4. Append, click, and cleanup
    document.body.appendChild(link);
    link.click();
    
    // 5. Release memory and remove element
    setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    }, 100);
  }

  

  get visiblePages(): number[] {
    const maxVisible = 20;
    let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
    let end = start + maxVisible - 1;
  
    // Adjust if we are near the end of the total pages
    if (end > this.totalPages) {
      end = this.totalPages;
      start = Math.max(1, end - maxVisible + 1);
    }
  
    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }
}
