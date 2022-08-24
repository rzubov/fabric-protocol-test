import RequestExecutor from './RequestExecutor';
import { RemoteHandler } from './types/controller';
import { BaseController } from './BaseController';

export class RemoteController extends BaseController {
  private readonly request: RemoteHandler;

  constructor(request: RemoteHandler) {
    super();
    this.request = request;
  }

  public async handle(
    request: object | null,
    previousResponse?: object,
    skipNext?: boolean
  ): Promise<unknown> {
    const requestExecutor = new RequestExecutor(this.request.protocol);
    const response = await requestExecutor.execute(
      this.request,
      request,
      previousResponse
    );
    if (skipNext || ! response.next) {
      return response;
    }
    return this.handleNext(request, response);
  }
}
