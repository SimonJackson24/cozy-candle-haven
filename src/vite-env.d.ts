/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MEDUSA_API_URL: string
  readonly VITE_VENDURE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}