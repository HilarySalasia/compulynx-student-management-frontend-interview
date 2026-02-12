import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../model/student';
import { environment } from '../../environments/environment.development';
import { PaginatedStudent } from '../model/paginatedStudent';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = environment.backend.apiUrl + '/api/student';

  constructor(
    private http: HttpClient
  ) { }

  getAllStudents() {
    return this.http.get<Array<Student>>(this.apiUrl);
  }

  editStudent(studentId: Number, data: Student): Observable<Student> {
    const url = `${this.apiUrl}/${studentId}`;
    return this.http.put<Student>(url, data);
  }

  getStudentsWithPaginationAndSorting(
    page: number,
    size: number,
    sortBy: string,
    sortDirection: string,
    className?: string
  ): Observable<PaginatedStudent> {
    const params: any = {
      page,
      size,
      sortBy,
      sortDirection,
    };

    if (className) {
      params.className = className;
    }

    return this.http.get<PaginatedStudent>(`${this.apiUrl}/paginated`, { params });
  }

  deleteStudentById(studentId: number): Observable<void> {
    console.log("Id: ", studentId)
    return this.http.delete<void>(`${this.apiUrl}/${studentId}`);
  }

  deleteAllStudents(): Observable<void> {
    return this.http.delete<void>(this.apiUrl);
  }
}
