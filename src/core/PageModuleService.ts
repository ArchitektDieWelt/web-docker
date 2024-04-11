import AssetFactory from "./AssetFactory";
import { Logger } from "~/core/Logger";
import type {
  IncludeType,
  PageInclude,
  PageModuleConfig,
} from "~/core/ModuleConfig";
import { ModuleService } from "~/core/ModuleService";

class PageModuleService implements ModuleService {
  private readonly logger: Logger = new Logger("PageModuleService");

  constructor(
    private readonly config: PageModuleConfig,
    private readonly assetFactory = new AssetFactory(),
    private readonly documentBody = document.body,
    private readonly documentHead = document.head
  ) {
    this.assetFactory = assetFactory;

    if (config.pages.length === 0 || config.pages.some(this.matches))
      this.injectAssets();
  }

  matches = (page: string | PageInclude): boolean => {
    if (this.isPageIncludeSemantics(page)) {
      console.warn(
        "PageInclude semantics are not implemented yet, please use a RegExp instead"
      );
      return false;
    } else {
      return !!window.location.pathname.match(new RegExp(page));
    }
  };

  isPageIncludeSemantics = (
    page: string | PageInclude
  ): page is PageInclude => {
    return (page as PageInclude).include !== undefined;
  };

  private injectAssets(): void {
    const headAssets = this.assetFactory.create(this.config.assets, "head");
    const bodyAssets = this.assetFactory.create(this.config.assets, "body");
    headAssets.forEach((asset) => this.documentHead.appendChild(asset));
    bodyAssets.forEach((asset) => this.documentBody.appendChild(asset));

    this.logger.log("injected assets in head", headAssets);
    this.logger.log("injected assets in body", bodyAssets);
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
    this.logger.warn("remove() is not implemented for PageModuleService");
  }
}
export { PageModuleService };
