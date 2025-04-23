import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Optionally modify request (e.g., add auth token)
    const clonedReq = req.clone({
      // headers: req.headers.set('Authorization', 'Bearer token')
    });

    return next.handle(clonedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Global HTTP Error:', error);
        return throwError(() => new Error(error.message || 'Unknown Error'));
      })
    );
  }
}
