import { ClientMessage } from '../proto/hello_package/ClientMessage';

interface Request {
  data: ClientMessage;
  serverInfo: {
    serverName: string;
    serverId: string;
  };
}

const helloController = async (
  req: Request,
  previousResponse?: any,
  next?: any
): Promise<any> => {
  if (req.serverInfo?.serverId === '2') {
    return {
      serverName: req.serverInfo.serverName,
      serverId: req.serverInfo.serverId,
    };
  }
  if (next) {
    return next(req.data);
  }
};

export default helloController;
