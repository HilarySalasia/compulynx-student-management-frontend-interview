import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../model/student';
import { environment } from '../../environments/environment.development';
import { TextResponse } from '../model/textResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  private apiUrl = environment.backend.apiUrl + '/api/excel';

  constructor(
    private http: HttpClient
  ) { }

  generateExcelFile(numberOfRows: number): Observable<TextResponse> {
    const params = new HttpParams().set('numberOfRows', numberOfRows.toString());
  
    return this.http.get<TextResponse>(this.apiUrl, { params });
  }

  convertExcelToCsv(file: File): Observable<TextResponse> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<TextResponse>(`${this.apiUrl}/convertToCsv`, formData);
  }

  exportToExcelFile(): Observable<Blob> { 
    return this.http.post(`${this.apiUrl}/exportToExcelFile`, 
      {},
      {
        responseType: 'blob', 
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    );
  }
}
