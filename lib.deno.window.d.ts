declare interface Window extends WindowOrWorkerGlobalScope {
  window: Window & WindowOrWorkerGlobalScope & typeof globalThis;
  self: Window & WindowOrWorkerGlobalScope & typeof globalThis;
  onload: Function | undefined;
  onunload: Function | undefined;
  crypto: Crypto;
  close: () => void;
  closed: boolean;
  Deno: typeof Deno;
}
declare const window: Window & WindowOrWorkerGlobalScope & typeof globalThis;
declare const self: Window & WindowOrWorkerGlobalScope & typeof globalThis;
declare const onload: Function | undefined;
declare const onunload: Function | undefined;
declare const crypto: Crypto;
declare interface Crypto {
  readonly subtle: null;
  getRandomValues<
    T extends
      | Int8Array
      | Int16Array
      | Int32Array
      | Uint8Array
      | Uint16Array
      | Uint32Array
      | Uint8ClampedArray
      | Float32Array
      | Float64Array
      | DataView
      | null,
  >(
    array: T,
  ): T;
}
