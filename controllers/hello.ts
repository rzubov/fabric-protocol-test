import { Request } from '../lib/types/request';
import { v4 as uuidv4 } from 'uuid';

const helloController = async (
  req: Request,
  previousResponse?: any
): Promise<any> => {
  // If we can handle everything here
  if (req.metaData?.serverId === '2') {
    return {
      data: {
        serverName: req.metaData.serverName,
        serverId: req.metaData.serverId,
        sessionId: uuidv4(),
      },
    };
  }
  return {
    data: req.data,
    next: true,
  };
};

export default helloController;
