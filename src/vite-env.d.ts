/// <reference types="vite/client" />

interface Window {
  ethereum: any;
  myProvider: any;
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
