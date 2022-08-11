import { ClientMessage } from '../proto/hello_package/ClientMessage';

import { Request } from '../lib/types/request';

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
    };
  }
  if (next) {
    return next(req.data);
  }
};

export default helloController;
