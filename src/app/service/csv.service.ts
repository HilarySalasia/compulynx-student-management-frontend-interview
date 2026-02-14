import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../model/student';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CsvService {
  private apiUrl = environment.backend.apiUrl + '/api/csv';

  constructor(
    private http: HttpClient
  ) { }

  uploadStudentsData(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<Student[]>(`${this.apiUrl}/uploadStudentsData`, formData);
  }

  exportToCsvFile(): Observable<Blob> {
    return this.http.post(`${this.apiUrl}/exportToCsvFile`, {}, {
      responseType: 'blob',
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
  
  exportToPdfFile(): Observable<Blob> {
    return this.http.post(`${this.apiUrl}/exportToPdfFile`, {}, {
      responseType: 'blob'
      // Headers are optional if you aren't sending a body
    });
  }
}
