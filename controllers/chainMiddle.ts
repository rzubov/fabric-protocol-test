import { Request } from '../lib/types/request';

const chainMiddleController = async (req: Request): Promise<any> => {
  return {
    next: Math.random() < 0.5,
    data: 'middle',
  };
};

export default chainMiddleController;
