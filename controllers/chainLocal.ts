import { ControllerResponse } from '../lib/types/controller';

const chainLocalController = async (): Promise<ControllerResponse> => {
  return {
    next: true,
    data: 'local',
  };
};

export default chainLocalController;
