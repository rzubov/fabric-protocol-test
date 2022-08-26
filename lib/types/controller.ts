import { Controller } from '../Controller';
import { RemoteController } from '../RemoteController';

export interface ControllerError {
  error: string;
}

export interface ControllerResponse<T = unknown> {
  next?: boolean;
  data: T;
}

export type ControllerFn = (
  request: unknown,
  previousResponse?: unknown
) => Promise<ControllerResponse>;

export interface RemoteHandler {
  protocol: string;
  host: string;
  controller: string;
  method?: string;
}

export type IController = Controller | RemoteController;
