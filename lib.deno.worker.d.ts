declare interface DedicatedWorkerGlobalScope {
  self: DedicatedWorkerGlobalScope & typeof globalThis;
  onmessage: (e: MessageEvent) => void;
  onmessageerror: (e: MessageEvent) => void;
  location: Location;
  onerror: undefined | typeof onerror;
  name: typeof __workerMain.name;
  close: typeof __workerMain.close;
  postMessage: typeof __workerMain.postMessage;
}
declare const self: DedicatedWorkerGlobalScope & typeof globalThis;
declare let onmessage: ((e: { data: any }) => Promise<void> | void) | undefined;
declare let onerror:
  | ((
    msg: string,
    source: string,
    lineno: number,
    colno: number,
    e: Event,
  ) => boolean | void)
  | undefined;
declare const close: typeof __workerMain.close;
declare const name: typeof __workerMain.name;
declare const postMessage: typeof __workerMain.postMessage;
declare namespace __workerMain {
  export let onmessage: (e: { data: any }) => void;
  export function postMessage(data: any): void;
  export function close(): void;
  export const name: string;
}
