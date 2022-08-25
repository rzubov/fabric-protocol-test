import { ControllerResponse } from '../lib/types/controller';

interface IAuthRequest {
  sessionId: string;
}

interface IAuthError {
  error: string;
}

const authController = async (
  req: IAuthRequest
): Promise<ControllerResponse<IAuthRequest | IAuthError>> => {
  // If we can handle everything here
  if (!req?.sessionId) {
    return {
      data: {
        error: 'Auth failed, sessionId is required',
      },
    };
  }
  return {
    data: req,
  };
};

export default authController;
