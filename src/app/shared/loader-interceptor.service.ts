import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { LoadingScreenService } from '../loading-screen/loading-screen.service';
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptorService {

  constructor(
    private loaderService: LoadingScreenService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Check if we are in the browser
    const isBrowser = isPlatformBrowser(this.platformId);

    if (isBrowser) {
      this.loaderService.show();
    }

    return next.handle(req).pipe(
      finalize(() => {
        if (isBrowser) {
          this.loaderService.hide();
        }
      })
    );
  }
}
