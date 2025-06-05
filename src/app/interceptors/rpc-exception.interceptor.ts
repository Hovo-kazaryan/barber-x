// interceptors/rpc-exception.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class RpcExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof RpcException) {
          return throwError(() => error);
        }

        if (error instanceof HttpException) {
          const status = error.getStatus();
          const response = error.getResponse();
          const payload =
            typeof response === 'string'
              ? { message: response }
              : (response as any);

          const rpcPayload: any = {
            statusCode: status,
            message: payload.message || 'Validation error',
          };

          if (payload.fields) {
            rpcPayload.fields = payload.fields;
          }

          return throwError(() => new RpcException(rpcPayload));
        }

        return throwError(
          () =>
            new RpcException({
              statusCode: 500,
              message: error.message || 'Unexpected error',
            }),
        );
      }),
    );
  }
}
