import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { ProtoGrpcType } from '../../proto/hello';
import { ServerMessage } from '../../proto/hello_package/ServerMessage';

const host = '0.0.0.0:9090';
const packageDefinition = protoLoader.loadSync('./proto/hello.proto');
const proto = grpc.loadPackageDefinition(
  packageDefinition
) as unknown as ProtoGrpcType;

const grpcClient = new proto.hello_package.Greeting(
  host,
  grpc.credentials.createInsecure()
);

export default {
  sayHello: async (message: string) => {
    return new Promise((resolve, reject) => {
      const deadline = new Date();
      deadline.setSeconds(deadline.getSeconds() + 5);
      grpcClient.waitForReady(deadline, (error?: Error) => {
        if (error) {
          console.log(`Client connect error: ${error.message}`);
          reject(error.message);
        } else {
          grpcClient.sayHello(
            {
              message,
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
  },
};

