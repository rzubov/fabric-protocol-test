import { ServerControllerHook } from '../types/server-config';

export interface IRequestExecutionStrategy {
  execute(
    hook: ServerControllerHook,
    request?: object,
    previousResponse?: object
  ): Promise<object>;
}
