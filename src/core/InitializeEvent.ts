
export const InitializeEventType = "web-docker:initialize" as const;

class InitializeEvent extends CustomEvent<{
  configFilePath: string;
  logEvents: boolean;
}> {
  constructor(detail: { configFilePath: string; logEvents: boolean }) {
    super(InitializeEventType, { detail });
  }
}

export default InitializeEvent;
