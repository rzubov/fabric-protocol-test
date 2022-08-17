import { Request } from '../lib/types/request';

const afterAuthController = async (
  req: Request,
  previousResponse?: any,
  next?: any
): Promise<any> => {
  console.log('after auth', req, previousResponse);
  const auth = previousResponse.some(
    (r: { authenticated: any }) => r.authenticated
  );
  return {
    message: auth ? 'Success' : 'Failed',
  };
};

export default afterAuthController;
