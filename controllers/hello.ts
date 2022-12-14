import { v4 as uuidv4 } from 'uuid';
import { ControllerResponse } from '../lib/types/controller';

interface IHelloRequest {
  serverName?: string;
  serverId?: string;
}

interface IServerDataResponse extends IHelloRequest {
  sessionId: string;
}

const helloController = async (
  req: IHelloRequest
): Promise<ControllerResponse<IHelloRequest | IServerDataResponse>> => {
  // If we can handle everything here
  if (req.serverId === '2') {
    return {
      data: {
        serverName: req.serverName,
        serverId: req.serverId,
        sessionId: uuidv4(),
      },
    };
  }

  return {
    data: req,
    next: true,
  };
};

export default helloController;
