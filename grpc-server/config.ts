import { ServerConfig } from '../types/server-config';

const config: ServerConfig = {
  serverId: '2',
  serverName: 'GRPC server',
  controllers: {
    hello: {
      hooks: [],
    },
  },
};

export default config;
