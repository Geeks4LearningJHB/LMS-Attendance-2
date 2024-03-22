import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoaderService } from '../services/loader.service';


@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(public loaderService: LoaderService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // starts the loader
    this.loaderService.showLoader();
    return next.handle(request).pipe(
      tap(
        req => {
          if (req instanceof HttpResponse) {
            //stop the loader
            this.loaderService.hideLoader();
          }
        },
        err => {
          // staop the loader
          this.loaderService.hideLoader();
        }
      )
    );
  }
}

