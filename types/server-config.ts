export interface ServerControllerHook {
  protocol: string;
  host: string;
  controller: string;
  method?: string;
}

export interface ServerController {
  hooks: ServerControllerHook[];
}

export interface ServerConfig {
  serverId: string;
  serverName: string;
  controllers: Record<string, ServerController>;
}
