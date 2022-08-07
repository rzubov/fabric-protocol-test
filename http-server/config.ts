import { ServerConfig } from '../types/server-config';

const config: ServerConfig = {
  serverId: '1',
  serverName: 'HTTP server',
  controllers: {
    hello: {
      hooks: [
        {
          protocol: 'grpc',
          host: '0.0.0.0:9090',
          controller: 'sayHello',
          /*
          In the case of the http hook
          method: 'POST',
          */
        },
      ],
    },
  },
};

export default config;
