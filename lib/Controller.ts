import { BaseController } from './BaseController';
import { ControllerFn } from './types/controller';

export class Controller extends BaseController {
  private readonly controller: ControllerFn;

  constructor(controller: ControllerFn) {
    super();
    this.controller = controller;
  }

  public async handle(
    request: object | null = null,
    previousResponse?: object,
    skipNext?: boolean
  ): Promise<unknown> {
    const response = await this.controller(request, previousResponse);

    if (skipNext || !response.next) {
      return response.data;
    }
    return this.handleNext(request, response);
  }
}
