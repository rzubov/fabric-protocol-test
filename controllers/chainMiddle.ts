import { ControllerResponse } from '../lib/types/controller';

const chainMiddleController = async (): Promise<ControllerResponse<string>> => {
  return {
    next: Math.random() < 0.5,
    data: 'middle',
  };
};

export default chainMiddleController;
