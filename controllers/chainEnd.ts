import { ControllerResponse } from '../lib/types/controller';

const chainMiddleController = async (): Promise<ControllerResponse> => {
  return {
    next: false,
    data: 'end',
  };
};

export default chainMiddleController;
