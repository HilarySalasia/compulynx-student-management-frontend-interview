import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, TimeoutError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalServiceService {
  errorPopupVisible = false;
  errorMessage = '';

  constructor() {}

  showErrorPopup(message: string) {
    this.errorMessage = message;
    this.errorPopupVisible = true;
  }

  closeErrorPopup() {
    this.errorPopupVisible = false;
    this.errorMessage = '';
  }

  handleError(error: any): Observable<never> {
    console.log('Error: ', error)
    if (error?.error instanceof ErrorEvent || error instanceof TimeoutError || error.error instanceof Error) {
      // Client-side error
      this.errorMessage = 'CLIENT_ERROR';
    } else {
      // Server-side error
      switch (error.status) {
        case 0:
          this.errorMessage = 'ERROR_500';
          break;
        case 400:
          this.errorMessage = 'ERROR_400';
          break;
        case 401:
          this.errorMessage = 'ERROR_401';
          break;
        case 403:
          this.errorMessage = 'ERROR_403';
          break;
        case 404:
          this.errorMessage = 'ERROR_404';
          break;
        case 500:
          this.errorMessage = 'ERROR_500';
          break;
        case 502:
          this.errorMessage = 'ERROR_502';
          break;
        case 503:
          this.errorMessage = 'ERROR_503';
          break;
        case 504:
          this.errorMessage = 'ERROR_504';
          break;
        default:
          this.errorMessage = 'ERROR_GENERIC';
      }
    }

    this.errorPopupVisible = true;

    console.error(`Backend returned code ${error.error}, body was: ${error.message}`);
    return throwError(() => this.errorMessage);
  }
}
