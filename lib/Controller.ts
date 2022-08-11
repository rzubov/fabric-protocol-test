import RequestExecutor from './RequestExecutor';
import { ControllerFn, Handler } from './types/controller';
import { Request } from './types/request';

export class Controller {
  private controller: ControllerFn;
  private nextHandler?: Handler;

  constructor(controller: ControllerFn) {
    this.controller = controller;
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
    const requestExecutor = new RequestExecutor(this.nextHandler.protocol);
    return await requestExecutor.execute(this.nextHandler, request);
  }

  public async handle(
    request: Request,
    previousResponse?: object
  ): Promise<unknown> {
    return this.controller(
      request,
      previousResponse,
      this.handleNext.bind(this)
    );
  }
}
