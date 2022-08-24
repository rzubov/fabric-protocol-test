export interface ControllerError {
  error: string;
}

export interface ControllerResponse {
  next?: boolean;
  data: unknown;
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
