import { Config } from "~/core/Config";

export const RegisterEventType = "openreply:web-docker:register" as const;

class RegisterEvent extends CustomEvent<Config> {
  constructor(detail: Config) {
    super(RegisterEventType, { detail });
  }
}

export default RegisterEvent;
