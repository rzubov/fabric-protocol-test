import { ServerControllerHook } from '../types/server-config';
import { IRequestExecutionStrategy } from './types';
import GRPCClient from '../clients/GRPCClient';

class GRPCRequest implements IRequestExecutionStrategy {
  execute(hook: ServerControllerHook, data?: object): Promise<unknown> {
    const client = new GRPCClient(hook.host);
    return client.execute(hook, data);
  }
}

export default GRPCRequest;
