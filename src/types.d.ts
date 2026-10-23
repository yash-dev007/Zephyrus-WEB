import type Lenis from 'lenis';

declare global {
  interface Window {
    __lenis?: Lenis;
  }

  interface Navigator {
    connection?: {
      saveData?: boolean;
      effectiveType?: string;
    };
    mozConnection?: Navigator['connection'];
    webkitConnection?: Navigator['connection'];
  }
}

export {};
