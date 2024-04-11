/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_REMOVE_HASH_FROM_ASSETS: string;
  readonly VITE_APP_BASE_PATH: string;
  readonly VITE_APP_LOG_EVENTS: boolean;
  readonly VITE_CONFIG_FILE_PATH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
