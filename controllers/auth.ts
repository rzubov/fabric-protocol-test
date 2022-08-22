import { Request } from '../lib/types/request';

const authController = async (
  req: Request,
  previousResponse?: any,
): Promise<any> => {
  // If we can handle everything here
  console.log('auth controller', req);
  if (!req?.data?.sessionId) {
    return {
      error: 'Auth failed, sessionId is required',
    };
  }

  return {
    data: req.data,
  };
};

export default authController;
