import { ControllerFn, Handler } from './types/controller';
import { Request } from './types/request';
import { RemoteController } from './RemoteController';

export class Controller {
  private controller: ControllerFn;
  private nextHandler?: Controller | RemoteController;

  constructor(controller: ControllerFn) {
    this.controller = controller;
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
    return this.controller(
      request,
      previousResponse,
      this.handleNext.bind(this)
    );
  }
}
