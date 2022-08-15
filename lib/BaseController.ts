import { Handler } from './types/controller';
import { RemoteController } from './RemoteController';
import { Request } from './types/request';
import { Controller } from './Controller';

export abstract class BaseController {
  protected nextHandler?: Controller | RemoteController;

  public setNext(handler: Controller | RemoteController): Handler {
    this.nextHandler = handler;
    return handler;
  }

  public setNextGroup(handlers: any) {
    this.nextHandler = handlers;
    return [...handlers].pop();
  }

  public async handleNext(
    request: Request,
    previousResponse?: object
  ): Promise<unknown> {
    if (!this.nextHandler) {
      return previousResponse;
    }
    if (this.nextHandler instanceof Array) {
      return Promise.all(
        this.nextHandler.map((handler) =>
          handler.handle(request, previousResponse)
        )
      )
    }
    return this.nextHandler.handle(request, previousResponse);
  }

  abstract handle(
    request: Request,
    previousResponse?: object
  ): Promise<unknown>;
}
