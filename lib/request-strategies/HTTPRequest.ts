import { ServerControllerHook } from '../types/server-config';
import { IRequestExecutionStrategy } from './types';
import axios from 'axios';

class HTTPRequest implements IRequestExecutionStrategy {
  execute(
    hook: ServerControllerHook,
    request?: object,
    previousResponse?: object
  ): Promise<object> {
    return axios.request({
      url: `${hook.host}/${hook.controller}`,
      method: hook.method,
      data: {
        request,
        previousResponse,
      },
    });
  }
}

export default HTTPRequest;
