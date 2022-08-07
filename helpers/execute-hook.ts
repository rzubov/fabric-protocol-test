import { ServerControllerHook } from '../types/server-config';
import grpcClient from '../http-server/grpc-client';
import axios from 'axios';

const executeHook = async (
  hook: ServerControllerHook,
  data?: any
): Promise<any> => {
  /*TODO: implement common interface for clients instead of direct call*/
  switch (hook.protocol) {
    case 'grpc':
      /*TODO: create new instance and pass host*/
      // @ts-ignore
      return grpcClient[hook.controller](data) as Promise<any>;
    case 'http':
      return axios.request({
        url: `${hook.host}/${hook.controller}`,
        method: hook.method,
      });
    default:
      return {
        error: `${hook.protocol} is not supported`,
      };
  }
};

export default executeHook;
