declare interface WindowOrWorkerGlobalScope {
  fetch: typeof __fetch.fetch;
  File: __domTypes.DomFileConstructor;
  CustomEvent: typeof __customEvent.CustomEvent;
  Event: typeof __event.Event;
  EventTarget: typeof __eventTarget.EventTarget;
  Headers: __domTypes.HeadersConstructor;
  FormData: __domTypes.FormDataConstructor;
  ReadableStream: __domTypes.ReadableStreamConstructor;
  Request: __domTypes.RequestConstructor;
  Response: typeof __fetch.Response;
  location: __domTypes.Location;
}
declare namespace WebAssembly {
  interface WebAssemblyInstantiatedSource {
    module: Module;
    instance: Instance;
  }
  function compile(bufferSource: BufferSource): Promise<Module>;
  function compileStreaming(
    source: Promise<__domTypes.Response>,
  ): Promise<Module>;
  function instantiate(
    bufferSource: BufferSource,
    importObject?: object,
  ): Promise<WebAssemblyInstantiatedSource>;
  function instantiate(
    module: Module,
    importObject?: object,
  ): Promise<Instance>;
  function instantiateStreaming(
    source: Promise<__domTypes.Response>,
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
declare const fetch: typeof __fetch.fetch;
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
declare const console: Console;
declare const File: __domTypes.DomFileConstructor;
declare const CustomEventInit: typeof __customEvent.CustomEventInit;
declare const CustomEvent: typeof __customEvent.CustomEvent;
declare const EventInit: typeof __event.EventInit;
declare const Event: typeof __event.Event;
declare const EventListener: __domTypes.EventListener;
declare const EventTarget: typeof __eventTarget.EventTarget;
declare const Headers: __domTypes.HeadersConstructor;
declare const location: __domTypes.Location;
declare const FormData: __domTypes.FormDataConstructor;
declare const ReadableStream: __domTypes.ReadableStreamConstructor;
declare const Request: __domTypes.RequestConstructor;
declare const Response: typeof __fetch.Response;
declare function addEventListener(
  type: string,
  callback: __domTypes.EventListenerOrEventListenerObject | null,
  options?: boolean | __domTypes.AddEventListenerOptions | undefined,
): void;
declare function dispatchEvent(event: __domTypes.Event): boolean;
declare function removeEventListener(
  type: string,
  callback: __domTypes.EventListenerOrEventListenerObject | null,
  options?: boolean | __domTypes.EventListenerOptions | undefined,
): void;
declare type Body = __domTypes.Body;
declare type File = __domTypes.DomFile;
declare type CustomEventInit = __domTypes.CustomEventInit;
declare type CustomEvent = __domTypes.CustomEvent;
declare type EventInit = __domTypes.EventInit;
declare type Event = __domTypes.Event;
declare type EventListener = __domTypes.EventListener;
declare type EventTarget = __domTypes.EventTarget;
declare type Headers = __domTypes.Headers;
declare type FormData = __domTypes.FormData;
declare type ReadableStream<R = any> = __domTypes.ReadableStream<R>;
declare type Request = __domTypes.Request;
declare type Response = __domTypes.Response;
declare interface ImportMeta {
  url: string;
  main: boolean;
}
declare namespace __domTypes {
  export type HeadersInit =
    | Headers
    | Array<[string, string]>
    | Record<string, string>;
  type BodyInit =
    | Blob
    | BufferSource
    | FormData
    | URLSearchParams
    | ReadableStream
    | string;
  export type RequestInfo = Request | string;
  type ReferrerPolicy =
    | ""
    | "no-referrer"
    | "no-referrer-when-downgrade"
    | "origin-only"
    | "origin-when-cross-origin"
    | "unsafe-url";
  export type FormDataEntryValue = DomFile | string;
  export interface DomIterable<K, V> {
    keys(): IterableIterator<K>;
    values(): IterableIterator<V>;
    entries(): IterableIterator<[K, V]>;
    [Symbol.iterator](): IterableIterator<[K, V]>;
    forEach(
      callback: (value: V, key: K, parent: this) => void,
      thisArg?: any,
    ): void;
  }
  interface AbortSignalEventMap {
    abort: ProgressEvent;
  }
  export enum NodeType {
    ELEMENT_NODE = 1,
    TEXT_NODE = 3,
    DOCUMENT_FRAGMENT_NODE = 11,
  }
  export interface EventListener {
    (evt: Event): void | Promise<void>;
  }
  export interface EventListenerObject {
    handleEvent(evt: Event): void | Promise<void>;
  }
  export type EventListenerOrEventListenerObject =
    | EventListener
    | EventListenerObject;
  export interface EventTargetListener {
    callback: EventListenerOrEventListenerObject;
    options: AddEventListenerOptions;
  }
  export const eventTargetHost: unique symbol;
  export const eventTargetListeners: unique symbol;
  export const eventTargetMode: unique symbol;
  export const eventTargetNodeType: unique symbol;
  export interface EventTarget {
    addEventListener(
      type: string,
      callback: EventListenerOrEventListenerObject | null,
      options?: boolean | AddEventListenerOptions,
    ): void;
    dispatchEvent(event: Event): boolean;
    removeEventListener(
      type: string,
      callback?: EventListenerOrEventListenerObject | null,
      options?: EventListenerOptions | boolean,
    ): void;
  }
  export interface ProgressEventInit extends EventInit {
    lengthComputable?: boolean;
    loaded?: number;
    total?: number;
  }
  export interface EventInit {
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
  }
  export interface CustomEventInit extends EventInit {
    detail?: any;
  }
  export enum EventPhase {
    NONE = 0,
    CAPTURING_PHASE = 1,
    AT_TARGET = 2,
    BUBBLING_PHASE = 3,
  }
  export interface EventPath {
    item: EventTarget;
    itemInShadowTree: boolean;
    relatedTarget: EventTarget | null;
    rootOfClosedTree: boolean;
    slotInClosedTree: boolean;
    target: EventTarget | null;
    touchTargetList: EventTarget[];
  }
  export interface Event {
    readonly type: string;
    target: EventTarget | null;
    currentTarget: EventTarget | null;
    composedPath(): EventPath[];
    eventPhase: number;
    stopPropagation(): void;
    stopImmediatePropagation(): void;
    readonly bubbles: boolean;
    readonly cancelable: boolean;
    preventDefault(): void;
    readonly defaultPrevented: boolean;
    readonly composed: boolean;
    isTrusted: boolean;
    readonly timeStamp: Date;
    dispatched: boolean;
    readonly initialized: boolean;
    inPassiveListener: boolean;
    cancelBubble: boolean;
    cancelBubbleImmediately: boolean;
    path: EventPath[];
    relatedTarget: EventTarget | null;
  }
  export interface CustomEvent extends Event {
    readonly detail: any;
    initCustomEvent(
      type: string,
      bubbles?: boolean,
      cancelable?: boolean,
      detail?: any | null,
    ): void;
  }
  export interface DomFile extends Blob {
    readonly lastModified: number;
    readonly name: string;
  }
  export interface DomFileConstructor {
    new (
      bits: BlobPart[],
      filename: string,
      options?: FilePropertyBag,
    ): DomFile;
    prototype: DomFile;
  }
  export interface FilePropertyBag extends BlobPropertyBag {
    lastModified?: number;
  }
  interface ProgressEvent extends Event {
    readonly lengthComputable: boolean;
    readonly loaded: number;
    readonly total: number;
  }
  export interface EventListenerOptions {
    capture?: boolean;
  }
  export interface AddEventListenerOptions extends EventListenerOptions {
    once?: boolean;
    passive?: boolean;
  }
  interface AbortSignal extends EventTarget {
    readonly aborted: boolean;
    onabort: ((this: AbortSignal, ev: ProgressEvent) => any) | null;
    addEventListener<K extends keyof AbortSignalEventMap>(
      type: K,
      listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any,
      options?: boolean | AddEventListenerOptions,
    ): void;
    addEventListener(
      type: string,
      listener: EventListener,
      options?: boolean | AddEventListenerOptions,
    ): void;
    removeEventListener<K extends keyof AbortSignalEventMap>(
      type: K,
      listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any,
      options?: boolean | EventListenerOptions,
    ): void;
    removeEventListener(
      type: string,
      listener: EventListener,
      options?: boolean | EventListenerOptions,
    ): void;
  }
  export interface ReadableStreamReadDoneResult<T> {
    done: true;
    value?: T;
  }
  export interface ReadableStreamReadValueResult<T> {
    done: false;
    value: T;
  }
  export type ReadableStreamReadResult<T> =
    | ReadableStreamReadValueResult<T>
    | ReadableStreamReadDoneResult<T>;
  export interface ReadableStreamDefaultReader<R = any> {
    readonly closed: Promise<void>;
    cancel(reason?: any): Promise<void>;
    read(): Promise<ReadableStreamReadResult<R>>;
    releaseLock(): void;
  }
  export interface PipeOptions {
    preventAbort?: boolean;
    preventCancel?: boolean;
    preventClose?: boolean;
    signal?: AbortSignal;
  }
  export interface UnderlyingSource<R = any> {
    cancel?: ReadableStreamErrorCallback;
    pull?: ReadableStreamDefaultControllerCallback<R>;
    start?: ReadableStreamDefaultControllerCallback<R>;
    type?: undefined;
  }
  export interface ReadableStreamErrorCallback {
    (reason: any): void | PromiseLike<void>;
  }
  export interface ReadableStreamDefaultControllerCallback<R> {
    (controller: ReadableStreamDefaultController<R>): void | PromiseLike<void>;
  }
  export interface ReadableStreamDefaultController<R> {
    readonly desiredSize: number;
    enqueue(chunk?: R): void;
    close(): void;
    error(e?: any): void;
  }
  export interface ReadableStream<R = any> {
    readonly locked: boolean;
    cancel(reason?: any): Promise<void>;
    getReader(options: { mode: "byob" }): ReadableStreamBYOBReader;
    getReader(): ReadableStreamDefaultReader<R>;
    tee(): [ReadableStream<R>, ReadableStream<R>];
  }
  export interface ReadableStreamConstructor<R = any> {
    new (src?: UnderlyingSource<R>): ReadableStream<R>;
    prototype: ReadableStream<R>;
  }
  export interface ReadableStreamReader<R = any> {
    cancel(reason: any): Promise<void>;
    read(): Promise<ReadableStreamReadResult<R>>;
    releaseLock(): void;
  }
  export interface ReadableStreamBYOBReader {
    readonly closed: Promise<void>;
    cancel(reason?: any): Promise<void>;
    read<T extends ArrayBufferView>(
      view: T,
    ): Promise<ReadableStreamReadResult<T>>;
    releaseLock(): void;
  }
  export interface WritableStream<W = any> {
    readonly locked: boolean;
    abort(reason?: any): Promise<void>;
    getWriter(): WritableStreamDefaultWriter<W>;
  }
  export interface WritableStreamDefaultWriter<W = any> {
    readonly closed: Promise<void>;
    readonly desiredSize: number | null;
    readonly ready: Promise<void>;
    abort(reason?: any): Promise<void>;
    close(): Promise<void>;
    releaseLock(): void;
    write(chunk: W): Promise<void>;
  }
  export interface FormData extends DomIterable<string, FormDataEntryValue> {
    append(name: string, value: string | Blob, fileName?: string): void;
    delete(name: string): void;
    get(name: string): FormDataEntryValue | null;
    getAll(name: string): FormDataEntryValue[];
    has(name: string): boolean;
    set(name: string, value: string | Blob, fileName?: string): void;
  }
  export interface FormDataConstructor {
    new (): FormData;
    prototype: FormData;
  }
  export interface Body {
    readonly body: ReadableStream<Uint8Array> | null;
    readonly bodyUsed: boolean;
    arrayBuffer(): Promise<ArrayBuffer>;
    blob(): Promise<Blob>;
    formData(): Promise<FormData>;
    json(): Promise<any>;
    text(): Promise<string>;
  }
  export interface Headers extends DomIterable<string, string> {
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
  export interface HeadersConstructor {
    new (init?: HeadersInit): Headers;
    prototype: Headers;
  }
  type RequestCache =
    | "default"
    | "no-store"
    | "reload"
    | "no-cache"
    | "force-cache"
    | "only-if-cached";
  type RequestCredentials = "omit" | "same-origin" | "include";
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
  type RequestMode = "navigate" | "same-origin" | "no-cors" | "cors";
  type RequestRedirect = "follow" | "error" | "manual";
  type ResponseType =
    | "basic"
    | "cors"
    | "default"
    | "error"
    | "opaque"
    | "opaqueredirect";
  export interface RequestInit {
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
  export interface ResponseInit {
    headers?: HeadersInit;
    status?: number;
    statusText?: string;
  }
  export interface RequestConstructor {
    new (input: RequestInfo, init?: RequestInit): Request;
    prototype: Request;
  }
  export interface Request extends Body {
    readonly cache?: RequestCache;
    readonly credentials?: RequestCredentials;
    readonly destination?: RequestDestination;
    readonly headers: Headers;
    readonly integrity?: string;
    readonly isHistoryNavigation?: boolean;
    readonly isReloadNavigation?: boolean;
    readonly keepalive?: boolean;
    readonly method: string;
    readonly mode?: RequestMode;
    readonly redirect?: RequestRedirect;
    readonly referrer?: string;
    readonly referrerPolicy?: ReferrerPolicy;
    readonly signal?: AbortSignal;
    readonly url: string;
    clone(): Request;
  }
  export interface Response extends Body {
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
  export interface DOMStringList {
    readonly length: number;
    contains(string: string): boolean;
    item(index: number): string | null;
    [index: number]: string;
  }
  export interface Location {
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
declare namespace __event {
  export const eventAttributes: WeakMap<object, any>;
  export class EventInit implements __domTypes.EventInit {
    bubbles: boolean;
    cancelable: boolean;
    composed: boolean;
    constructor({
      bubbles,
      cancelable,
      composed,
    }?: {
      bubbles?: boolean | undefined;
      cancelable?: boolean | undefined;
      composed?: boolean | undefined;
    });
  }
  export class Event implements __domTypes.Event {
    isTrusted: boolean;
    private _canceledFlag;
    private _dispatchedFlag;
    private _initializedFlag;
    private _inPassiveListenerFlag;
    private _stopImmediatePropagationFlag;
    private _stopPropagationFlag;
    private _path;
    constructor(type: string, eventInitDict?: __domTypes.EventInit);
    readonly bubbles: boolean;
    cancelBubble: boolean;
    cancelBubbleImmediately: boolean;
    readonly cancelable: boolean;
    readonly composed: boolean;
    currentTarget: __domTypes.EventTarget;
    readonly defaultPrevented: boolean;
    dispatched: boolean;
    eventPhase: number;
    readonly initialized: boolean;
    inPassiveListener: boolean;
    path: __domTypes.EventPath[];
    relatedTarget: __domTypes.EventTarget;
    target: __domTypes.EventTarget;
    readonly timeStamp: Date;
    readonly type: string;
    composedPath(): __domTypes.EventPath[];
    preventDefault(): void;
    stopPropagation(): void;
    stopImmediatePropagation(): void;
  }
}
declare namespace __customEvent {
  export const customEventAttributes: WeakMap<object, any>;
  export class CustomEventInit extends __event.EventInit
    implements __domTypes.CustomEventInit {
    detail: any;
    constructor({
      bubbles,
      cancelable,
      composed,
      detail,
    }: __domTypes.CustomEventInit);
  }
  export class CustomEvent extends __event.Event
    implements __domTypes.CustomEvent {
    constructor(type: string, customEventInitDict?: __domTypes.CustomEventInit);
    readonly detail: any;
    initCustomEvent(
      type: string,
      bubbles?: boolean,
      cancelable?: boolean,
      detail?: any,
    ): void;
    readonly [Symbol.toStringTag]: string;
  }
}
declare namespace __eventTarget {
  export class EventListenerOptions implements __domTypes.EventListenerOptions {
    _capture: boolean;
    constructor({ capture }?: { capture?: boolean | undefined });
    readonly capture: boolean;
  }
  export class AddEventListenerOptions extends EventListenerOptions
    implements __domTypes.AddEventListenerOptions {
    _passive: boolean;
    _once: boolean;
    constructor({
      capture,
      passive,
      once,
    }?: {
      capture?: boolean | undefined;
      passive?: boolean | undefined;
      once?: boolean | undefined;
    });
    readonly passive: boolean;
    readonly once: boolean;
  }
  export const eventTargetAssignedSlot: unique symbol;
  export const eventTargetHasActivationBehavior: unique symbol;
  export class EventTarget implements __domTypes.EventTarget {
    [__domTypes.eventTargetHost]: __domTypes.EventTarget | null;
    [__domTypes.eventTargetListeners]: {
      [type in string]: __domTypes.EventListener[];
    };
    [__domTypes.eventTargetMode]: string;
    [__domTypes.eventTargetNodeType]: __domTypes.NodeType;
    private [eventTargetAssignedSlot];
    private [eventTargetHasActivationBehavior];
    addEventListener(
      type: string,
      callback: __domTypes.EventListenerOrEventListenerObject | null,
      options?: __domTypes.AddEventListenerOptions | boolean,
    ): void;
    removeEventListener(
      type: string,
      callback: __domTypes.EventListenerOrEventListenerObject | null,
      options?: __domTypes.EventListenerOptions | boolean,
    ): void;
    dispatchEvent(event: __domTypes.Event): boolean;
    readonly [Symbol.toStringTag]: string;
  }
}
declare namespace __fetch {
  class Body
    implements
      __domTypes.Body,
      __domTypes.ReadableStream<Uint8Array>,
      Deno.ReadCloser
  {
    readonly contentType: string;
    bodyUsed: boolean;
    readonly locked: boolean;
    readonly body: __domTypes.ReadableStream<Uint8Array>;
    constructor(rid: number, contentType: string);
    arrayBuffer(): Promise<ArrayBuffer>;
    blob(): Promise<Blob>;
    formData(): Promise<__domTypes.FormData>;
    json(): Promise<any>;
    text(): Promise<string>;
    read(p: Uint8Array): Promise<number | Deno.EOF>;
    close(): void;
    cancel(): Promise<void>;
    getReader(options: { mode: "byob" }): __domTypes.ReadableStreamBYOBReader;
    getReader(): __domTypes.ReadableStreamDefaultReader<Uint8Array>;
    getReader(): __domTypes.ReadableStreamBYOBReader;
    tee(): [__domTypes.ReadableStream, __domTypes.ReadableStream];
    [Symbol.asyncIterator](): AsyncIterableIterator<Uint8Array>;
  }
  export class Response implements __domTypes.Response {
    readonly url: string;
    readonly status: number;
    statusText: string;
    readonly type: __domTypes.ResponseType;
    readonly redirected: boolean;
    headers: __domTypes.Headers;
    readonly trailer: Promise<__domTypes.Headers>;
    bodyUsed: boolean;
    readonly body: Body;
    constructor(
      url: string,
      status: number,
      statusText: string,
      headersList: Array<[string, string]>,
      rid: number,
      redirected_: boolean,
      type_?: null | __domTypes.ResponseType,
      body_?: null | Body,
    );
    arrayBuffer(): Promise<ArrayBuffer>;
    blob(): Promise<Blob>;
    formData(): Promise<__domTypes.FormData>;
    json(): Promise<any>;
    text(): Promise<string>;
    readonly ok: boolean;
    clone(): __domTypes.Response;
    redirect(url: URL | string, status: number): __domTypes.Response;
  }
  export function fetch(
    input: __domTypes.Request | URL | string,
    init?: __domTypes.RequestInit,
  ): Promise<Response>;
}
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
declare class Worker {
  onerror?: (e: Event) => void;
  onmessage?: (data: any) => void;
  onmessageerror?: () => void;
  constructor(
    specifier: string,
    options?: {
      type?: "classic" | "module";
      name?: string;
    },
  );
  postMessage(data: any): void;
  terminate(): void;
}
declare namespace performance {
  export function now(): number;
}
