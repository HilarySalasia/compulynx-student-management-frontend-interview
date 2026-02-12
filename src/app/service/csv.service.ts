import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../model/student';
import { environment } from '../../environments/environment.development';

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

  exportToCsvFile(data: Array<Student>) {
    return this.http.post(`${this.apiUrl}/exportToCsvFile`, data, {
      responseType: 'blob',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  exportToPdfFile(data: Array<Student>) {
    return this.http.post(`${this.apiUrl}/exportToPdfFile`, data, {
      responseType: 'blob',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
