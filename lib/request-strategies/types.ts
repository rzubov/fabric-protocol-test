import { ServerControllerHook } from '../../types/server-config';

export interface IRequestExecutionStrategy {
  execute(hook: ServerControllerHook, data?: object): Promise<unknown>;
}
