import { Asset, AssetLink, AssetPosition, AssetScript } from "~/core/Asset";

export default class AssetFactory {
  private static buildTagScript(attr: AssetScript): HTMLScriptElement {
    const script = document.createElement("script");
    script.src = attr.src;
    if (attr.buildType === "modern") {
      script.type = "module";
      script.setAttribute("crossorigin", "");
    } else {
      script.type = "text/javascript";
      if (attr.async) script.setAttribute("async", "");
    }

    if (attr.priority)
      script.setAttribute("data-priority", attr.priority.toString());

    return script;
  }

  private static buildTagLink(attr: AssetLink): HTMLLinkElement {
    const link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", attr.src);
    if (attr.media) link.setAttribute("media", attr.media);

    if (attr.priority)
      link.setAttribute("data-priority", attr.priority.toString());

    return link;
  }

  public create(
    assets: Asset[],
    position: AssetPosition = "head",
    countryCode?: string
  ): (HTMLLinkElement | HTMLScriptElement)[] {
    return (
      countryCode
        ? assets.filter(
            (asset) =>
              typeof asset.countries !== "object" ||
              asset.countries.includes(countryCode)
          )
        : assets
    )
      .filter((asset) => (asset.position ?? "head") === position)
      .sort((a, b) => {
        if (!a.priority || !b.priority) return 0;
        if (a.priority < b.priority) {
          return 1;
        } else if (a.priority > b.priority) {
          return -1;
        }
        return 0;
      })
      .map((entry) => {
        switch (entry.type) {
          case "css":
            return AssetFactory.buildTagLink(entry);
          case "js":
            return AssetFactory.buildTagScript(entry);
        }
      })
      .filter((item): item is HTMLLinkElement | HTMLScriptElement => !!item);
  }
}
