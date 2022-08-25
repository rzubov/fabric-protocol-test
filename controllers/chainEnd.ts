import { ControllerResponse } from '../lib/types/controller';

const chainMiddleController = async (): Promise<ControllerResponse<string>> => {
  return {
    next: false,
    data: 'end',
  };
};

export default chainMiddleController;
