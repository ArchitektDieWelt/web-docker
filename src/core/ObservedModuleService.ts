import AssetFactory from "./AssetFactory";
import { Logger } from "~/core/Logger";
import type { IncludeType, ObservedModuleConfig } from "~/core/ModuleConfig";
import { ModuleService } from "~/core/ModuleService";

class ObservedModuleService implements ModuleService {
  private readonly logger: Logger = new Logger("ObserverModuleService");
  private assetsInjected = false;

  constructor(
    private readonly config: ObservedModuleConfig,
    private readonly assetFactory = new AssetFactory(),
    private readonly documentBody = document.body,
    private readonly documentHead = document.head
  ) {
    this.assetFactory = assetFactory;

    if (this.elementExists()) this.injectAssets();

    this.observe();
  }

  private elementExists(): boolean {
    return !!document.querySelector(this.config.selector);
  }

  private observe(): void {
    const targetNode = document.body;

    const config = { childList: true, subtree: true };

    const callback: MutationCallback = (mutationList) => {
      for (const mutation of mutationList) {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => {
            if (
              node instanceof HTMLElement &&
              node.matches(this.config.selector)
            ) {
              this.injectAssets();
            }
            const children = node.childNodes;
            for (let i = 0; i < children.length; i++) {
              const child = children[i];
              if (
                child instanceof HTMLElement &&
                child.matches(this.config.selector)
              ) {
                this.injectAssets();
              }
            }
          });
        }
      }
    };

    const observer = new MutationObserver(callback);

    observer.observe(targetNode, config);
  }

  private injectAssets(): void {
    if (this.assetsInjected) return;

    const headAssets = this.assetFactory.create(this.config.assets, "head");
    const bodyAssets = this.assetFactory.create(this.config.assets, "body");
    headAssets.forEach((asset) => this.documentHead.appendChild(asset));
    bodyAssets.forEach((asset) => this.documentBody.appendChild(asset));

    this.logger.log("injected assets in head", headAssets);
    this.logger.log("injected assets in body", bodyAssets);

    this.assetsInjected = true;
  }

  get assetSources(): string[] {
    return this.config.assets.map((asset) => asset.src);
  }

  get module(): string {
    return this.config.module;
  }

  get type(): IncludeType {
    return this.config.type;
  }

  remove(): void {
    this.logger.warn("remove() is not implemented for ObservedModuleService");
  }
}
export { ObservedModuleService };
