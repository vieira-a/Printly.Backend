import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const isDevEnvironment = process.env.NODE_ENV;

    let status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    let error: string | object =
      exception instanceof HttpException ? exception.getResponse() : 'Erro interno do servidor.';

    isDevEnvironment
      ? this.logger.debug(
          `HTTP Status: ${status} | Path: ${request.url} | Message: ${JSON.stringify(error)}`,
          exception instanceof Error ? exception.stack : '',
        )
      : this.logger.error(
          `HTTP Status: ${status} | Path: ${request.url} | Message: ${JSON.stringify(error)}`,
          exception instanceof Error ? exception : '',
        );

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      error,
    });
  }
}
