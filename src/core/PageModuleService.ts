import AssetFactory, { HtmlAsset } from "./AssetFactory";
import { Logger } from "~/core/Logger";
import type {
  IncludeType,
  PageInclude,
  PageModuleConfig,
} from "~/core/ModuleConfig";
import { ModuleService } from "~/core/ModuleService";
import { HTMLScriptElement } from "happy-dom";
import { forEachSeries } from "~/core/utils";

class PageModuleService implements ModuleService {
  private readonly logger: Logger;

  constructor(
    private readonly config: PageModuleConfig,
    private readonly assetFactory = new AssetFactory(),
    private readonly logEvents: boolean = false,
    private readonly documentBody = document.body,
    private readonly documentHead = document.head
  ) {
    this.logger = new Logger("PageModuleService", this.logEvents);
    this.assetFactory = assetFactory;
  }

  private async addLoadEventListeners(asset: HtmlAsset): Promise<void> {
    return new Promise((resolve, reject) => {
      asset.addEventListener("load", () => {
        resolve();
      });
      asset.addEventListener("error", (err: unknown) => {
        reject(err);
      });
    });
  }

  public async load(): Promise<void> {
    if (
      this.config.pages.length === 0 ||
      this.config.pages.some(this.matches)
    ) {
      const headAssets = this.assetFactory.create(this.config.assets, "head");
      const bodyAssets = this.assetFactory.create(this.config.assets, "body");

      if (this.config.exposes) {
        await forEachSeries(headAssets, async (asset) => {
          const loadEventPromise = this.addLoadEventListeners(asset);
          this.documentHead.appendChild(asset);
          await loadEventPromise;
        });

        await forEachSeries(bodyAssets, async (asset) => {
          const loadEventPromise = this.addLoadEventListeners(asset);
          this.documentBody.appendChild(asset);
          await loadEventPromise;
        });
      } else {
        headAssets.forEach((asset) => this.documentHead.appendChild(asset));
        bodyAssets.forEach((asset) => this.documentBody.appendChild(asset));
      }

      this.logger.log("injected assets in head", headAssets);
      this.logger.log("injected assets in body", bodyAssets);
    }
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
