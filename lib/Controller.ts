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
    previousResponse?: object
  ): Promise<unknown> {
    return this.controller(
      request,
      previousResponse,
      this.handleNext.bind(this)
    );
  }
}
