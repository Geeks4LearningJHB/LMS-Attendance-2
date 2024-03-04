import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ServerErrorCodes } from '../global/server-error-codes';
import { ToastrMessagesService } from '../global/toastr-messages.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  exceptionObject: any | undefined = {};

  constructor(private toastrMessageService: ToastrMessagesService) { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorObj: any = {};
        if (error.error instanceof ErrorEvent) {
          errorObj = {
            title: 'Client side error',
            message: `${error.error.message}`,
          };
        } else {
          console.log('I am error : ', error);
          this.exceptionObject = JSON.parse(error.error.message);

          errorObj = {
            title: 'Server side error',
            errorCode: this.exceptionObject?.ErrorCode,
            message: `${this.exceptionObject?.Message}`,
          };
        }

        switch (this.exceptionObject?.ErrorCode) {
          case ServerErrorCodes.UserNotFound:
          case ServerErrorCodes.DuplicateEmail:
          case ServerErrorCodes.DuplicatePhoneNumber:
          case ServerErrorCodes.DuplicateIdNumber:
            break;
          default:
            this.toastrMessageService.showErrorMessage(errorObj?.message, errorObj?.title);
            break;
        }

        return throwError(errorObj);
      })
    );
  }
}
