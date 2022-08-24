import { ControllerResponse } from '../lib/types/controller';

interface IAuthPrevious {
  authenticated: boolean;
}

const afterAuthController = async (
  req: null,
  previousResponse: IAuthPrevious[]
): Promise<ControllerResponse> => {
  const auth = previousResponse.some((r) => r.authenticated);
  return {
    data: auth ? 'Success' : 'Failed',
  };
};

export default afterAuthController;
