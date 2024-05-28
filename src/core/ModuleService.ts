export interface ModuleService {
  get assetSources(): string[];
  get module(): string;
  remove(): void;
  load(): Promise<void>;
}
