import { Request } from '../lib/types/request';

const afterAuthController = async (
  req: Request,
  previousResponse?: any
): Promise<any> => {
  console.log('after auth', req, previousResponse);
  const auth = previousResponse.some(
    (r: { authenticated: any }) => r.authenticated
  );
  return {
    data: auth ? 'Success' : 'Failed',
  };
};

export default afterAuthController;
