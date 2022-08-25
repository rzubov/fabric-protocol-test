export interface ControllerError {
  error: string;
}

export interface ControllerResponse<T = unknown> {
  next?: boolean;
  data: T;
}

type ControllerNextFn = (
  request: object,
  previousResponse?: object
) => Promise<unknown>;

export type ControllerFn = (
  request: any,
  previousResponse?: any,
  next?: ControllerNextFn
) => Promise<ControllerResponse>;

export interface RemoteHandler {
  protocol: string;
  host: string;
  controller: string;
  method?: string;
}
