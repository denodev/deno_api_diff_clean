declare namespace WebAssembly {
  interface WebAssemblyInstantiatedSource {
    module: Module;
    instance: Instance;
  }
  function compile(bufferSource: BufferSource): Promise<Module>;
  function compileStreaming(source: Promise<Response>): Promise<Module>;
  function instantiate(
    bufferSource: BufferSource,
    importObject?: object,
  ): Promise<WebAssemblyInstantiatedSource>;
  function instantiate(
    module: Module,
    importObject?: object,
  ): Promise<Instance>;
  function instantiateStreaming(
    source: Promise<Response>,
    importObject?: object,
  ): Promise<WebAssemblyInstantiatedSource>;
  function validate(bufferSource: BufferSource): boolean;
  type ImportExportKind = "function" | "table" | "memory" | "global";
  interface ModuleExportDescriptor {
    name: string;
    kind: ImportExportKind;
  }
  interface ModuleImportDescriptor {
    module: string;
    name: string;
    kind: ImportExportKind;
  }
  class Module {
    constructor(bufferSource: BufferSource);
    static customSections(
      moduleObject: Module,
      sectionName: string,
    ): ArrayBuffer;
    static exports(moduleObject: Module): ModuleExportDescriptor[];
    static imports(moduleObject: Module): ModuleImportDescriptor[];
  }
  class Instance<T extends object = { [key: string]: any }> {
    constructor(module: Module, importObject?: object);
    readonly exports: T;
  }
  interface MemoryDescriptor {
    initial: number;
    maximum?: number;
  }
  class Memory {
    constructor(descriptor: MemoryDescriptor);
    readonly buffer: ArrayBuffer;
    grow(delta: number): number;
  }
  type TableKind = "anyfunc";
  interface TableDescriptor {
    element: TableKind;
    initial: number;
    maximum?: number;
  }
  class Table {
    constructor(descriptor: TableDescriptor);
    readonly length: number;
    get(index: number): (...args: any[]) => any;
    grow(delta: number): number;
    set(index: number, value: (...args: any[]) => any): void;
  }
  type ValueType = "i32" | "i64" | "f32" | "f64";
  interface GlobalDescriptor {
    value: ValueType;
    mutable?: boolean;
  }
  class Global {
    constructor(descriptor: GlobalDescriptor, value?: any);
    valueOf(): any;
    value: any;
  }
  class CompileError extends Error {
    constructor(message: string, fileName?: string, lineNumber?: string);
  }
  class LinkError extends Error {
    constructor(message: string, fileName?: string, lineNumber?: string);
  }
  class RuntimeError extends Error {
    constructor(message: string, fileName?: string, lineNumber?: string);
  }
}
declare function setTimeout(
  cb: (...args: unknown[]) => void,
  delay?: number,
  ...args: unknown[]
): number;
declare function setInterval(
  cb: (...args: unknown[]) => void,
  delay?: number,
  ...args: unknown[]
): number;
declare function clearTimeout(id?: number): void;
declare function clearInterval(id?: number): void;
declare function queueMicrotask(func: Function): void;
declare var console: Console;
declare var location: Location;
declare function addEventListener(
  type: string,
  callback: EventListenerOrEventListenerObject | null,
  options?: boolean | AddEventListenerOptions | undefined,
): void;
declare function dispatchEvent(event: Event): boolean;
declare function removeEventListener(
  type: string,
  callback: EventListenerOrEventListenerObject | null,
  options?: boolean | EventListenerOptions | undefined,
): void;
declare interface ImportMeta {
  url: string;
  main: boolean;
}
interface DomIterable<K, V> {
  keys(): IterableIterator<K>;
  values(): IterableIterator<V>;
  entries(): IterableIterator<[K, V]>;
  [Symbol.iterator](): IterableIterator<[K, V]>;
  forEach(
    callback: (value: V, key: K, parent: this) => void,
    thisArg?: any,
  ): void;
}
interface ReadableStreamReadDoneResult<T> {
  done: true;
  value?: T;
}
interface ReadableStreamReadValueResult<T> {
  done: false;
  value: T;
}
type ReadableStreamReadResult<T> =
  | ReadableStreamReadValueResult<T>
  | ReadableStreamReadDoneResult<T>;
interface ReadableStreamDefaultReader<R = any> {
  readonly closed: Promise<void>;
  cancel(reason?: any): Promise<void>;
  read(): Promise<ReadableStreamReadResult<R>>;
  releaseLock(): void;
}
interface UnderlyingSource<R = any> {
  cancel?: ReadableStreamErrorCallback;
  pull?: ReadableStreamDefaultControllerCallback<R>;
  start?: ReadableStreamDefaultControllerCallback<R>;
  type?: undefined;
}
interface ReadableStreamErrorCallback {
  (reason: any): void | PromiseLike<void>;
}
interface ReadableStreamDefaultControllerCallback<R> {
  (controller: ReadableStreamDefaultController<R>): void | PromiseLike<void>;
}
interface ReadableStreamDefaultController<R> {
  readonly desiredSize: number;
  enqueue(chunk?: R): void;
  close(): void;
  error(e?: any): void;
}
interface ReadableStream<R = any> {
  readonly locked: boolean;
  cancel(reason?: any): Promise<void>;
  getReader(): ReadableStreamDefaultReader<R>;
  tee(): [ReadableStream<R>, ReadableStream<R>];
}
declare const ReadableStream: {
  prototype: ReadableStream;
  new <R = any>(src?: UnderlyingSource<R>): ReadableStream<R>;
};
interface WritableStream<W = any> {
  readonly locked: boolean;
  abort(reason?: any): Promise<void>;
  getWriter(): WritableStreamDefaultWriter<W>;
}
interface WritableStreamDefaultWriter<W = any> {
  readonly closed: Promise<void>;
  readonly desiredSize: number | null;
  readonly ready: Promise<void>;
  abort(reason?: any): Promise<void>;
  close(): Promise<void>;
  releaseLock(): void;
  write(chunk: W): Promise<void>;
}
interface DOMStringList {
  readonly length: number;
  contains(string: string): boolean;
  item(index: number): string | null;
  [index: number]: string;
}
declare class DOMException extends Error {
  constructor(message?: string, name?: string);
  readonly name: string;
  readonly message: string;
}
declare interface Location {
  readonly ancestorOrigins: DOMStringList;
  hash: string;
  host: string;
  hostname: string;
  href: string;
  toString(): string;
  readonly origin: string;
  pathname: string;
  port: string;
  protocol: string;
  search: string;
  assign(url: string): void;
  reload(): void;
  replace(url: string): void;
}
type BufferSource = ArrayBufferView | ArrayBuffer;
type BlobPart = BufferSource | Blob | string;
interface BlobPropertyBag {
  type?: string;
  ending?: "transparent" | "native";
}
interface Blob {
  readonly size: number;
  readonly type: string;
  arrayBuffer(): Promise<ArrayBuffer>;
  slice(start?: number, end?: number, contentType?: string): Blob;
  stream(): ReadableStream;
  text(): Promise<string>;
}
declare const Blob: {
  prototype: Blob;
  new (blobParts?: BlobPart[], options?: BlobPropertyBag): Blob;
};
interface FilePropertyBag extends BlobPropertyBag {
  lastModified?: number;
}
interface File extends Blob {
  readonly lastModified: number;
  readonly name: string;
}
declare const File: {
  prototype: File;
  new (fileBits: BlobPart[], fileName: string, options?: FilePropertyBag): File;
};
declare const isConsoleInstance: unique symbol;
declare class Console {
  indentLevel: number;
  [isConsoleInstance]: boolean;
  log: (...args: unknown[]) => void;
  debug: (...args: unknown[]) => void;
  info: (...args: unknown[]) => void;
  dir: (
    obj: unknown,
    options?: Partial<{
      showHidden: boolean;
      depth: number;
      colors: boolean;
      indentLevel: number;
    }>,
  ) => void;
  dirxml: (
    obj: unknown,
    options?: Partial<{
      showHidden: boolean;
      depth: number;
      colors: boolean;
      indentLevel: number;
    }>,
  ) => void;
  warn: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
  assert: (condition?: boolean, ...args: unknown[]) => void;
  count: (label?: string) => void;
  countReset: (label?: string) => void;
  table: (data: unknown, properties?: string[] | undefined) => void;
  time: (label?: string) => void;
  timeLog: (label?: string, ...args: unknown[]) => void;
  timeEnd: (label?: string) => void;
  group: (...label: unknown[]) => void;
  groupCollapsed: (...label: unknown[]) => void;
  groupEnd: () => void;
  clear: () => void;
  trace: (...args: unknown[]) => void;
  static [Symbol.hasInstance](instance: Console): boolean;
}
type FormDataEntryValue = File | string;
interface FormData extends DomIterable<string, FormDataEntryValue> {
  append(name: string, value: string | Blob, fileName?: string): void;
  delete(name: string): void;
  get(name: string): FormDataEntryValue | null;
  getAll(name: string): FormDataEntryValue[];
  has(name: string): boolean;
  set(name: string, value: string | Blob, fileName?: string): void;
}
declare const FormData: {
  prototype: FormData;
  new (): FormData;
};
interface Body {
  readonly body: ReadableStream<Uint8Array> | null;
  readonly bodyUsed: boolean;
  arrayBuffer(): Promise<ArrayBuffer>;
  blob(): Promise<Blob>;
  formData(): Promise<FormData>;
  json(): Promise<any>;
  text(): Promise<string>;
}
type HeadersInit = Headers | string[][] | Record<string, string>;
interface Headers {
  append(name: string, value: string): void;
  delete(name: string): void;
  get(name: string): string | null;
  has(name: string): boolean;
  set(name: string, value: string): void;
  forEach(
    callbackfn: (value: string, key: string, parent: Headers) => void,
    thisArg?: any,
  ): void;
}
interface Headers extends DomIterable<string, string> {
  append(name: string, value: string): void;
  delete(name: string): void;
  entries(): IterableIterator<[string, string]>;
  get(name: string): string | null;
  has(name: string): boolean;
  keys(): IterableIterator<string>;
  set(name: string, value: string): void;
  values(): IterableIterator<string>;
  forEach(
    callbackfn: (value: string, key: string, parent: this) => void,
    thisArg?: any,
  ): void;
  [Symbol.iterator](): IterableIterator<[string, string]>;
}
declare const Headers: {
  prototype: Headers;
  new (init?: HeadersInit): Headers;
};
type RequestInfo = Request | string;
type RequestCache =
  | "default"
  | "force-cache"
  | "no-cache"
  | "no-store"
  | "only-if-cached"
  | "reload";
type RequestCredentials = "include" | "omit" | "same-origin";
type RequestMode = "cors" | "navigate" | "no-cors" | "same-origin";
type RequestRedirect = "error" | "follow" | "manual";
type ReferrerPolicy =
  | ""
  | "no-referrer"
  | "no-referrer-when-downgrade"
  | "origin"
  | "origin-when-cross-origin"
  | "same-origin"
  | "strict-origin"
  | "strict-origin-when-cross-origin"
  | "unsafe-url";
type BodyInit =
  | Blob
  | BufferSource
  | FormData
  | URLSearchParams
  | ReadableStream<Uint8Array>
  | string;
type RequestDestination =
  | ""
  | "audio"
  | "audioworklet"
  | "document"
  | "embed"
  | "font"
  | "image"
  | "manifest"
  | "object"
  | "paintworklet"
  | "report"
  | "script"
  | "sharedworker"
  | "style"
  | "track"
  | "video"
  | "worker"
  | "xslt";
interface RequestInit {
  body?: BodyInit | null;
  cache?: RequestCache;
  credentials?: RequestCredentials;
  headers?: HeadersInit;
  integrity?: string;
  keepalive?: boolean;
  method?: string;
  mode?: RequestMode;
  redirect?: RequestRedirect;
  referrer?: string;
  referrerPolicy?: ReferrerPolicy;
  signal?: AbortSignal | null;
  window?: any;
}
interface Request extends Body {
  readonly cache: RequestCache;
  readonly credentials: RequestCredentials;
  readonly destination: RequestDestination;
  readonly headers: Headers;
  readonly integrity: string;
  readonly isHistoryNavigation: boolean;
  readonly isReloadNavigation: boolean;
  readonly keepalive: boolean;
  readonly method: string;
  readonly mode: RequestMode;
  readonly redirect: RequestRedirect;
  readonly referrer: string;
  readonly referrerPolicy: ReferrerPolicy;
  readonly signal: AbortSignal;
  readonly url: string;
  clone(): Request;
}
declare const Request: {
  prototype: Request;
  new (input: RequestInfo, init?: RequestInit): Request;
};
type ResponseType =
  | "basic"
  | "cors"
  | "default"
  | "error"
  | "opaque"
  | "opaqueredirect";
interface Response extends Body {
  readonly headers: Headers;
  readonly ok: boolean;
  readonly redirected: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly trailer: Promise<Headers>;
  readonly type: ResponseType;
  readonly url: string;
  clone(): Response;
}
declare const Response: {
  prototype: Response;
  new (
    url: string,
    status: number,
    statusText: string,
    headersList: Array<[string, string]>,
    rid: number,
    redirected_: boolean,
    type_?: null | ResponseType,
    body_?: null | Body,
  ): Response;
  error(): Response;
  redirect(url: string, status?: number): Response;
};
declare function fetch(
  input: Request | URL | string,
  init?: RequestInit,
): Promise<Response>;
declare function atob(s: string): string;
declare function btoa(s: string): string;
declare class TextDecoder {
  readonly encoding: string;
  readonly fatal: boolean;
  readonly ignoreBOM = false;
  constructor(
    label?: string,
    options?: { fatal?: boolean; ignoreBOM?: boolean },
  );
  decode(input?: BufferSource, options?: { stream?: false }): string;
  readonly [Symbol.toStringTag]: string;
}
declare class TextEncoder {
  readonly encoding = "utf-8";
  encode(input?: string): Uint8Array;
  encodeInto(
    input: string,
    dest: Uint8Array,
  ): { read: number; written: number };
  readonly [Symbol.toStringTag]: string;
}
interface URLSearchParams {
  append(name: string, value: string): void;
  delete(name: string): void;
  getAll(name: string): string[];
  get(name: string): string | null;
  has(name: string): boolean;
  set(name: string, value: string): void;
  sort(): void;
  forEach(
    callbackfn: (value: string, key: string, parent: this) => void,
    thisArg?: any,
  ): void;
  keys(): IterableIterator<string>;
  values(): IterableIterator<string>;
  entries(): IterableIterator<[string, string]>;
  [Symbol.iterator](): IterableIterator<[string, string]>;
  toString(): string;
}
declare const URLSearchParams: {
  prototype: URLSearchParams;
  new (
    init?: string[][] | Record<string, string> | string | URLSearchParams,
  ): URLSearchParams;
  toString(): string;
};
interface URL {
  hash: string;
  host: string;
  hostname: string;
  href: string;
  toString(): string;
  readonly origin: string;
  password: string;
  pathname: string;
  port: string;
  protocol: string;
  search: string;
  readonly searchParams: URLSearchParams;
  username: string;
  toJSON(): string;
}
declare const URL: {
  prototype: URL;
  new (url: string, base?: string | URL): URL;
  createObjectURL(object: any): string;
  revokeObjectURL(url: string): void;
};
interface MessageEventInit extends EventInit {
  data?: any;
  origin?: string;
  lastEventId?: string;
}
declare class MessageEvent extends Event {
  readonly data: any;
  readonly origin: string;
  readonly lastEventId: string;
  constructor(type: string, eventInitDict?: MessageEventInit);
}
interface ErrorEventInit extends EventInit {
  message?: string;
  filename?: string;
  lineno?: number;
  colno?: number;
  error?: any;
}
declare class ErrorEvent extends Event {
  readonly message: string;
  readonly filename: string;
  readonly lineno: number;
  readonly colno: number;
  readonly error: any;
  constructor(type: string, eventInitDict?: ErrorEventInit);
}
interface PostMessageOptions {
  transfer?: any[];
}
declare class Worker extends EventTarget {
  onerror?: (e: ErrorEvent) => void;
  onmessage?: (e: MessageEvent) => void;
  onmessageerror?: (e: MessageEvent) => void;
  constructor(
    specifier: string,
    options?: {
      type?: "classic" | "module";
      name?: string;
    },
  );
  postMessage(message: any, transfer: ArrayBuffer[]): void;
  postMessage(message: any, options?: PostMessageOptions): void;
  terminate(): void;
}
declare namespace performance {
  export function now(): number;
}
interface EventInit {
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
}
declare class Event {
  constructor(type: string, eventInitDict?: EventInit);
  readonly bubbles: boolean;
  cancelBubble: boolean;
  readonly cancelable: boolean;
  readonly composed: boolean;
  readonly currentTarget: EventTarget | null;
  readonly defaultPrevented: boolean;
  readonly eventPhase: number;
  readonly isTrusted: boolean;
  readonly target: EventTarget | null;
  readonly timeStamp: number;
  readonly type: string;
  composedPath(): EventTarget[];
  preventDefault(): void;
  stopImmediatePropagation(): void;
  stopPropagation(): void;
  readonly AT_TARGET: number;
  readonly BUBBLING_PHASE: number;
  readonly CAPTURING_PHASE: number;
  readonly NONE: number;
  static readonly AT_TARGET: number;
  static readonly BUBBLING_PHASE: number;
  static readonly CAPTURING_PHASE: number;
  static readonly NONE: number;
}
declare class EventTarget {
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject | null,
    options?: boolean | AddEventListenerOptions,
  ): void;
  dispatchEvent(event: Event): boolean;
  removeEventListener(
    type: string,
    callback: EventListenerOrEventListenerObject | null,
    options?: EventListenerOptions | boolean,
  ): void;
  [Symbol.toStringTag]: string;
}
interface EventListener {
  (evt: Event): void | Promise<void>;
}
interface EventListenerObject {
  handleEvent(evt: Event): void | Promise<void>;
}
declare type EventListenerOrEventListenerObject =
  | EventListener
  | EventListenerObject;
interface AddEventListenerOptions extends EventListenerOptions {
  once?: boolean;
  passive?: boolean;
}
interface EventListenerOptions {
  capture?: boolean;
}
interface ProgressEvent<T extends EventTarget = EventTarget> extends Event {
  readonly lengthComputable: boolean;
  readonly loaded: number;
  readonly target: T | null;
  readonly total: number;
}
interface CustomEventInit<T = any> extends EventInit {
  detail?: T;
}
declare class CustomEvent<T = any> extends Event {
  constructor(typeArg: string, eventInitDict?: CustomEventInit<T>);
  readonly detail: T;
}
declare class AbortController {
  readonly signal: AbortSignal;
  abort(): void;
}
interface AbortSignalEventMap {
  abort: Event;
}
interface AbortSignal extends EventTarget {
  readonly aborted: boolean;
  onabort: ((this: AbortSignal, ev: Event) => any) | null;
  addEventListener<K extends keyof AbortSignalEventMap>(
    type: K,
    listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions,
  ): void;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ): void;
  removeEventListener<K extends keyof AbortSignalEventMap>(
    type: K,
    listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any,
    options?: boolean | EventListenerOptions,
  ): void;
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions,
  ): void;
}
declare const AbortSignal: {
  prototype: AbortSignal;
  new (): AbortSignal;
};
