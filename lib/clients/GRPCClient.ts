import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { ProtoGrpcType } from '../../proto/hello';
import { ServerMessage } from '../../proto/hello_package/ServerMessage';
import { ServerControllerHook } from '../types/server-config';

const packageDefinition = protoLoader.loadSync('./proto/hello.proto');
const proto = grpc.loadPackageDefinition(
  packageDefinition
) as unknown as ProtoGrpcType;



export default class GRPCClient{
  client: grpc.Client

  constructor(host: string, credentials?: object) {
    this.client = new proto.hello_package.Greeting(
      host,
      grpc.credentials.createInsecure()
    )
  }

  async execute(hook: ServerControllerHook, data?: object) {
    return new Promise((resolve, reject) => {
      const deadline = new Date();
      deadline.setSeconds(deadline.getSeconds() + 5);

      this.client.waitForReady(deadline, (error?: Error) => {
        if (error) {
          console.log(`Client connect error: ${error.message}`);
          reject(error.message);
        } else {
          if(!(hook.controller in this.client)){
            throw new Error(`${hook.controller} method is not supported`)
          }

          // @ts-ignore
          this.client[hook.controller](
            {
              message: JSON.stringify(data),
            },
            (
              error?: grpc.ServiceError | null,
              serverMessage?: ServerMessage
            ) => {
              if (error) {
                console.error(error.message);
                reject(error.message);
              } else if (serverMessage) {
                console.log(
                  `(grpc client) Got grpc server message: ${JSON.stringify(
                    serverMessage
                  )}`
                );
                resolve(serverMessage);
              }
            }
          );
        }
      });
    });
  }
}

