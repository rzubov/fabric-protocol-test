import { ControllerResponse } from '../lib/types/controller';

const chainLocalController = async (): Promise<ControllerResponse<string>> => {
  return {
    next: true,
    data: 'local',
  };
};

export default chainLocalController;
