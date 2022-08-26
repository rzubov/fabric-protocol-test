import { IController } from './types/controller';

export abstract class BaseController {
  protected nextHandler?: IController | IController[];

  public setNext(
    handler: IController
  ): IController {
    this.nextHandler = handler;
    return handler;
  }

  public setNextGroup(handlers: IController[]) {
    this.nextHandler = handlers;
    return [...handlers].pop();
  }

  public async handleNext(
    request: object | null,
    previousResponse?: object
  ): Promise<unknown> {
    if (!this.nextHandler) {
      return previousResponse;
    }

    if (this.nextHandler instanceof Array) {
      const handlers = [...this.nextHandler];
      const lastHandler = handlers.pop();
      const previousResponses = await Promise.all(
        handlers.map((handler) => handler.handle(request, previousResponse))
      );
      const lastResponse = await lastHandler?.handle(
        request,
        previousResponse,
        true
      );
      previousResponses.push(lastResponse);
      return lastHandler?.handleNext(request, previousResponses);
    }
    return this.nextHandler.handle(request, previousResponse);
  }

  abstract handle(
    request: object | null,
    previousResponse?: object,
    skipNext?: boolean
  ): Promise<unknown>;
}
