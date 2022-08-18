import { Request } from './request';

export interface ControllerError {
  error: string;
}

type ControllerNextFn = (
  request: Request,
  previousResponse?: object
) => Promise<unknown>;

export type ControllerFn = (
  request: Request,
  previousResponse?: object,
  next?: ControllerNextFn
) => object;

export interface RemoteHandler {
  protocol: string;
  host: string;
  controller: string;
  method?: string;
}

export interface LocalHandler {
  setNext(handler: Handler): Handler;

  handleNext(request: Request, previousResponse?: object): Promise<unknown>;

  handle(request: Request, previousResponse?: object): Promise<unknown>;
}

export type Handler = RemoteHandler | LocalHandler;
