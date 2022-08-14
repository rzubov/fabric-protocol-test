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

  public async handleNext(
    request: Request,
    previousResponse?: object
  ): Promise<unknown> {
    if (!this.nextHandler) {
      return previousResponse;
    }
    return this.nextHandler.handle(request, previousResponse);
  }

  abstract handle(
    request: Request,
    previousResponse?: object
  ): Promise<unknown>;
}
