import { ControllerResponse } from '../lib/types/controller';

const chainMiddleController = async (): Promise<ControllerResponse> => {
  return {
    next: Math.random() < 0.5,
    data: 'middle',
  };
};

export default chainMiddleController;
