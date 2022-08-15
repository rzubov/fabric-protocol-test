import { ServerControllerHook } from '../types/server-config';
import { IRequestExecutionStrategy } from './types';
import axios from 'axios';

class HTTPRequest implements IRequestExecutionStrategy {
  async execute(
    hook: ServerControllerHook,
    request?: object,
    previousResponse?: object
  ): Promise<object> {;
    const response = await axios.request({
      url: `http://${hook.host}/${hook.controller}`,
      method: hook.method,
      data: {
        request,
        previousResponse,
      },
    });
    return response.data;
  }
}

export default HTTPRequest;
