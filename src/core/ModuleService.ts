import { IncludeType } from "~/core/ModuleConfig";

export interface ModuleService {
  get assetSources(): string[];
  get module(): string;
  remove(): void;
  get type(): IncludeType;
}
