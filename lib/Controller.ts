import { Request } from './types/request';
import { BaseController } from './BaseController';
import { ControllerFn } from './types/controller';

export class Controller extends BaseController {
  private readonly controller: ControllerFn;

  constructor(controller: ControllerFn) {
    super();
    this.controller = controller;
  }

  public async handle(
    request: Request,
    previousResponse?: object,
    skipNext?: boolean
  ): Promise<unknown> {
    return this.controller(
      request,
      previousResponse,
      skipNext ? void 0 : this.handleNext.bind(this)
    );
  }
}
