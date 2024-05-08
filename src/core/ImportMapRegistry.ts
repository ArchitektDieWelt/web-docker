interface ImportMap {
  [key: string]: string;
}

export class ImportMapRegistry {
  private importMap: ImportMap = {};

  constructor(
    private readonly script: HTMLScriptElement = document.createElement("script"),
    private readonly documentHead = document.head
  ) {
    this.script.type = "importmap";
    this.documentHead.appendChild(this.script);
  }

  public add(importMap: ImportMap) {
    this.importMap = {
      ...this.importMap,
      ...importMap,
    };
    this.script.textContent = JSON.stringify(this.importMap);
  }

  public get(): ImportMap {
    return this.importMap;
  }
}
