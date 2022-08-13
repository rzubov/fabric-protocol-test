import { ServerControllerHook } from '../types/server-config';
import { IRequestExecutionStrategy } from './types';
import GRPCClient from '../clients/GRPCClient';

class GRPCRequest implements IRequestExecutionStrategy {
  execute(
    hook: ServerControllerHook,
    request?: object,
    previousResponse?: object
  ): Promise<any> {
    const client = new GRPCClient(hook.host);
    return client.execute(hook, request, previousResponse);
  }
}

export default GRPCRequest;
