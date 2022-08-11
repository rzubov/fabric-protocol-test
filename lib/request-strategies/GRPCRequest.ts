import { ServerControllerHook } from '../../types/server-config';
import grpcClient from '../clients/grpc-client';
import { IRequestExecutionStrategy } from './types';

class GRPCRequest implements IRequestExecutionStrategy {
  execute(hook: ServerControllerHook, data?: object): Promise<unknown> {
    /*TODO: create new instance and pass host*/
    // @ts-ignore
    return grpcClient[hook.controller](
      JSON.stringify(data)
    ) as Promise<unknown>;
  }
}

export default GRPCRequest;
