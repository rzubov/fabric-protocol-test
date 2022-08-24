import { ServerControllerHook } from '../types/server-config';
import { IRequestExecutionStrategy } from './types';
import axios from 'axios';
import { ControllerResponse } from '../types/controller';

class HTTPRequest implements IRequestExecutionStrategy {
  async execute(
    hook: ServerControllerHook,
    request?: object | null,
    previousResponse?: object
  ): Promise<ControllerResponse> {
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
