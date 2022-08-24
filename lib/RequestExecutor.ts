import { ServerControllerHook } from './types/server-config';
import { IRequestExecutionStrategy } from './request-strategies/types';
import GRPCRequest from './request-strategies/GRPCRequest';
import HTTPRequest from './request-strategies/HTTPRequest';
import { ControllerResponse } from './types/controller';

const strategies = new Map([
  ['grpc', new GRPCRequest()],
  ['http', new HTTPRequest()],
]);

export default class RequestExecutor {
  private strategy!: IRequestExecutionStrategy;

  constructor(strategy: string) {
    this.setStrategy(strategy);
  }

  public setStrategy(strategy: string): void {
    const strategyInstance = strategies.get(strategy);
    if (!strategyInstance) {
      throw new Error(`${strategy} strategy is not supported`);
    }
    this.strategy = strategyInstance;
  }


  public execute(
    hook: ServerControllerHook,
    request?: object | null,
    previousResponse?: object
  ): Promise<ControllerResponse> {
    return this.strategy.execute(hook, request, previousResponse);
  }
}
