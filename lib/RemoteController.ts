import RequestExecutor from './RequestExecutor';
import { Handler, RemoteHandler } from './types/controller';
import { Request } from './types/request';

export class RemoteController {
  private request: RemoteHandler;
  private nextHandler?: Handler;

  constructor(request: RemoteHandler) {
    this.request = request;
  }

  public setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  public async handleNext(
    request: Request,
    previousResponse?: object
  ): Promise<unknown> {
    if (!this.nextHandler) {
      return null;
    }
    if (!('protocol' in this.nextHandler)) {
      return this.nextHandler.handle(request, previousResponse);
    }

  }

  public async handle(
    request: Request,
    previousResponse?: object
  ): Promise<unknown> {
    const requestExecutor = new RequestExecutor(this.request.protocol);
    const response = await requestExecutor.execute(
      this.request,
      request,
      previousResponse
    );
    return this.handleNext(request, response);
  }
}
