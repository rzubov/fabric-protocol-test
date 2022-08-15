import { Request } from '../lib/types/request';

const authController = async (
  req: Request,
  previousResponse?: any,
  next?: any
): Promise<any> => {
  // If we can handle everything here
  console.log('auth controller');
  if (next) {
    const response = await next(req.data);
    return response;
  }
};

export default authController;
