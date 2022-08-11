import { ServerControllerHook } from '../../types/server-config';
import { IRequestExecutionStrategy } from './types';
import axios from 'axios';

class HTTPRequest implements IRequestExecutionStrategy {
  execute(hook: ServerControllerHook, data?: object): Promise<unknown> {
    return axios.request({
      url: `${hook.host}/${hook.controller}`,
      method: hook.method,
      data,
    });
  }
}

export default HTTPRequest;
