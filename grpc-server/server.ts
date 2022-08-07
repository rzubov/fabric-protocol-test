import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { ProtoGrpcType } from '../proto/hello';
import { ClientMessage } from '../proto/hello_package/ClientMessage';
import { GreetingHandlers } from '../proto/hello_package/Greeting';
import { ServerMessage } from '../proto/hello_package/ServerMessage';

const host = '0.0.0.0:9090';

const greetingServer: GreetingHandlers = {
  sayHello(
    call: grpc.ServerUnaryCall<ClientMessage, ServerMessage>,
    callback: grpc.sendUnaryData<ServerMessage>
  ) {
    if (call.request) {
      console.log(`(grpc server) Got client message: ${call.request.message}`);
    }
    callback(null, {
      serverId: '2',
      serverName: 'GRPC Server',
    });
  },
};

function getServer(): grpc.Server {
  const packageDefinition = protoLoader.loadSync('./proto/hello.proto');
  const proto = grpc.loadPackageDefinition(
    packageDefinition
  ) as unknown as ProtoGrpcType;
  const server = new grpc.Server();
  server.addService(proto.hello_package.Greeting.service, greetingServer);
  return server;
}

if (require.main === module) {
  const server = getServer();
  server.bindAsync(
    host,
    grpc.ServerCredentials.createInsecure(),
    (err: Error | null, port: number) => {
      if (err) {
        console.error(`Server error: ${err.message}`);
      } else {
        console.log(`Server bound on port: ${port}`);
        server.start();
      }
    }
  );
}
