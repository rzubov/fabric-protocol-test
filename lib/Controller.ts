import RequestExecutor from './RequestExecutor';

interface RemoteHandler {
  protocol: string;
  host: string;
  controller: string;
  method?: string;
}

interface LocalHandler {
  setNext(handler: Handler): Handler;

  handleNext(request: any, previousResponse: any): any;

  handle(request: any, previousResponse: any): any;
}

type Handler = RemoteHandler | LocalHandler;

export class Controller {
  private controller: any;
  private nextHandler?: Handler;

  constructor(
    controller: any
  ) {
    this.controller = controller;
  }

  public setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  public async handleNext(request: any, previousResponse?: any): Promise<any> {
    if (!this.nextHandler) {
      return null;
    }
    if (!('protocol' in this.nextHandler)) {
      return this.nextHandler.handle(request, previousResponse);
    }
    const requestExecutor = new RequestExecutor(this.nextHandler.protocol);
    return await requestExecutor.execute(this.nextHandler, request);
  }

  public async handle(request: any, previousResponse?: any): Promise<any> {
    return this.controller(
      request,
      previousResponse,
      this.handleNext.bind(this)
    );
  }
}
