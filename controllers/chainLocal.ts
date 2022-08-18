import { Request } from '../lib/types/request';

const chainLocalController = async (req: Request): Promise<any> => {
  return {
    next: true,
    data: 'local',
  };
};

export default chainLocalController;
