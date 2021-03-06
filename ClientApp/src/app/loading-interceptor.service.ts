
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class LoadingInterceptorService implements HttpInterceptor {

  activeRequests: number = 0;

    constructor(
        private loadingScreenService: LoadingService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (this.activeRequests === 0) {
            this.loadingScreenService.startLoading();
        }

        this.activeRequests++;
        return timer(0).pipe( switchMap( ()=>  next.handle(request).pipe(
    finalize(() => {
        this.activeRequests--;
        if (this.activeRequests === 0) {
            this.loadingScreenService.stopLoading();
        }
    })
) ))
        
    };
}