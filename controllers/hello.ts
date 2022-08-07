import { ServerConfig } from '../types/server-config';
import { ClientMessage } from '../proto/hello_package/ClientMessage';
import { ServerMessage } from '../proto/hello_package/ServerMessage';
import executeHook from '../helpers/execute-hook';
import { ControllerError } from '../types/controller';

const helloController = async (
  req: ClientMessage,
  config: ServerConfig
): Promise<ServerMessage> => {
  const hooks = config.controllers['hello']?.hooks ?? [];
  if (hooks.length) {
    for (let i = 0; i < hooks.length; i++) {
      const hookResponse = await executeHook(hooks[i], req.message);
      console.log('hook response:', hookResponse);
    }
  }
  const { serverName, serverId } = config;
  return {
    serverName,
    serverId,
  };
};

export default helloController;
