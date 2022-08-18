import { Request } from '../lib/types/request';

const chainMiddleController = async (req: Request): Promise<any> => {
  return {
    next: false,
    data: 'end',
  };
};

export default chainMiddleController;
