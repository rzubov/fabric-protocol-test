import RequestExecutor from './RequestExecutor';
import { Handler, RemoteHandler } from './types/controller';
import { Request } from './types/request';
import { Controller } from './Controller';

export class RemoteController {
  private request: RemoteHandler;
  private nextHandler?: Controller | RemoteController;

  constructor(request: RemoteHandler) {
    this.request = request;
  }

  public setNext(handler: Controller | RemoteController): Handler {
    this.nextHandler = handler;
    return handler;
  }

  public async handleNext(
    request: Request,
    previousResponse?: object
  ): Promise<unknown> {
    if (!this.nextHandler) {
      return previousResponse;
    }
    return this.nextHandler.handle(request, previousResponse);
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
