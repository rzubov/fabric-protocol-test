import { Request } from '../lib/types/request';
import { v4 as uuidv4 } from 'uuid';

const helloController = async (
  req: Request,
  previousResponse?: any,
  next?: any
): Promise<any> => {
  // If we can handle everything here
  if (req.metaData?.serverId === '2') {
    return {
      serverName: req.metaData.serverName,
      serverId: req.metaData.serverId,
      sessionId: uuidv4(),
    };
  }
  if (next) {
    return next(req.data);
  }
};

export default helloController;
