import { ServerControllerHook } from '../types/server-config';
import { IRequestExecutionStrategy } from './request-strategies/types';
import GRPCRequest from './request-strategies/GRPCRequest';
import HTTPRequest from './request-strategies/HTTPRequest';

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

  public execute(hook: ServerControllerHook, data?: object): Promise<unknown> {
    return this.strategy.execute(hook, data);
  }
}
