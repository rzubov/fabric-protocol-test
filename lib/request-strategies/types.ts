import { ServerControllerHook } from '../types/server-config';
import { ControllerResponse } from '../types/controller';

export interface IRequestExecutionStrategy {
  execute(
    hook: ServerControllerHook,
    request?: object | null,
    previousResponse?: object
  ): Promise<ControllerResponse>;
}
