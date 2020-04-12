declare namespace Deno {
  export let pid: number;
  export let noColor: boolean;
  export type TestFunction = () => void | Promise<void>;
  export interface TestDefinition {
    fn: TestFunction;
    name: string;
  }
  export function test(t: TestDefinition): void;
  export function test(fn: TestFunction): void;
  export function test(name: string, fn: TestFunction): void;
  export interface RunTestsOptions {
    exitOnFail?: boolean;
    only?: RegExp;
    skip?: RegExp;
    disableLog?: boolean;
  }
  export function runTests(opts?: RunTestsOptions): Promise<void>;
  export function loadavg(): number[];
  export function hostname(): string;
  export function osRelease(): string;
  export function exit(code?: number): never;
  export function env(): {
    [index: string]: string;
  };
  export function env(key: string): string | undefined;
  export type DirKind =
    | "home"
    | "cache"
    | "config"
    | "executable"
    | "data"
    | "data_local"
    | "audio"
    | "desktop"
    | "document"
    | "download"
    | "font"
    | "picture"
    | "public"
    | "template"
    | "video";
  export function dir(kind: DirKind): string | null;
  export function execPath(): string;
  export function cwd(): string;
  export function chdir(directory: string): void;
  export const EOF: unique symbol;
  export type EOF = typeof EOF;
  export enum SeekMode {
    SEEK_START = 0,
    SEEK_CURRENT = 1,
    SEEK_END = 2,
  }
  export interface Reader {
    read(p: Uint8Array): Promise<number | EOF>;
  }
  export interface SyncReader {
    readSync(p: Uint8Array): number | EOF;
  }
  export interface Writer {
    write(p: Uint8Array): Promise<number>;
  }
  export interface SyncWriter {
    writeSync(p: Uint8Array): number;
  }
  export interface Closer {
    close(): void;
  }
  export interface Seeker {
    seek(offset: number, whence: SeekMode): Promise<void>;
  }
  export interface SyncSeeker {
    seekSync(offset: number, whence: SeekMode): void;
  }
  export interface ReadCloser extends Reader, Closer {}
  export interface WriteCloser extends Writer, Closer {}
  export interface ReadSeeker extends Reader, Seeker {}
  export interface WriteSeeker extends Writer, Seeker {}
  export interface ReadWriteCloser extends Reader, Writer, Closer {}
  export interface ReadWriteSeeker extends Reader, Writer, Seeker {}
  export function copy(dst: Writer, src: Reader): Promise<number>;
  export function toAsyncIterator(r: Reader): AsyncIterableIterator<Uint8Array>;
  export function openSync(filename: string, options?: OpenOptions): File;
  export function openSync(filename: string, mode?: OpenMode): File;
  export function open(filename: string, options?: OpenOptions): Promise<File>;
  export function open(filename: string, mode?: OpenMode): Promise<File>;
  export function createSync(filename: string): File;
  export function create(filename: string): Promise<File>;
  export function readSync(rid: number, p: Uint8Array): number | EOF;
  export function read(rid: number, p: Uint8Array): Promise<number | EOF>;
  export function writeSync(rid: number, p: Uint8Array): number;
  export function write(rid: number, p: Uint8Array): Promise<number>;
  export function seekSync(rid: number, offset: number, whence: SeekMode): void;
  export function seek(
    rid: number,
    offset: number,
    whence: SeekMode,
  ): Promise<void>;
  export function close(rid: number): void;
  export class File
    implements
      Reader,
      SyncReader,
      Writer,
      SyncWriter,
      Seeker,
      SyncSeeker,
      Closer
  {
    readonly rid: number;
    constructor(rid: number);
    write(p: Uint8Array): Promise<number>;
    writeSync(p: Uint8Array): number;
    read(p: Uint8Array): Promise<number | EOF>;
    readSync(p: Uint8Array): number | EOF;
    seek(offset: number, whence: SeekMode): Promise<void>;
    seekSync(offset: number, whence: SeekMode): void;
    close(): void;
  }
  export const stdin: File;
  export const stdout: File;
  export const stderr: File;
  export interface OpenOptions {
    read?: boolean;
    write?: boolean;
    create?: boolean;
    truncate?: boolean;
    append?: boolean;
    createNew?: boolean;
  }
  export type OpenMode = "r" | "r+" | "w" | "w+" | "a" | "a+" | "x" | "x+";
  export function isatty(rid: number): boolean;
  export function setRaw(rid: number, mode: boolean): void;
  export class Buffer implements Reader, SyncReader, Writer, SyncWriter {
    private buf;
    private off;
    private _tryGrowByReslice;
    private _reslice;
    private _grow;
    constructor(ab?: ArrayBuffer);
    bytes(): Uint8Array;
    toString(): string;
    empty(): boolean;
    readonly length: number;
    readonly capacity: number;
    truncate(n: number): void;
    reset(): void;
    readSync(p: Uint8Array): number | EOF;
    read(p: Uint8Array): Promise<number | EOF>;
    writeSync(p: Uint8Array): number;
    write(p: Uint8Array): Promise<number>;
    grow(n: number): void;
    readFrom(r: Reader): Promise<number>;
    readFromSync(r: SyncReader): number;
  }
  export function readAll(r: Reader): Promise<Uint8Array>;
  export function readAllSync(r: SyncReader): Uint8Array;
  export function writeAll(w: Writer, arr: Uint8Array): Promise<void>;
  export function writeAllSync(w: SyncWriter, arr: Uint8Array): void;
  export interface MkdirOption {
    recursive?: boolean;
    mode?: number;
  }
  export function mkdirSync(path: string, options?: MkdirOption): void;
  export function mkdirSync(
    path: string,
    recursive?: boolean,
    mode?: number,
  ): void;
  export function mkdir(path: string, options?: MkdirOption): Promise<void>;
  export function mkdir(
    path: string,
    recursive?: boolean,
    mode?: number,
  ): Promise<void>;
  export interface MakeTempOptions {
    dir?: string;
    prefix?: string;
    suffix?: string;
  }
  export function makeTempDirSync(options?: MakeTempOptions): string;
  export function makeTempDir(options?: MakeTempOptions): Promise<string>;
  export function makeTempFileSync(options?: MakeTempOptions): string;
  export function makeTempFile(options?: MakeTempOptions): Promise<string>;
  export function chmodSync(path: string, mode: number): void;
  export function chmod(path: string, mode: number): Promise<void>;
  export function chownSync(path: string, uid: number, gid: number): void;
  export function chown(path: string, uid: number, gid: number): Promise<void>;
  export function utimeSync(
    filename: string,
    atime: number | Date,
    mtime: number | Date,
  ): void;
  export function utime(
    filename: string,
    atime: number | Date,
    mtime: number | Date,
  ): Promise<void>;
  export interface RemoveOption {
    recursive?: boolean;
  }
  export function removeSync(path: string, options?: RemoveOption): void;
  export function remove(path: string, options?: RemoveOption): Promise<void>;
  export function renameSync(oldpath: string, newpath: string): void;
  export function rename(oldpath: string, newpath: string): Promise<void>;
  export function readFileSync(filename: string): Uint8Array;
  export function readFile(filename: string): Promise<Uint8Array>;
  export interface FileInfo {
    len: number;
    modified: number | null;
    accessed: number | null;
    created: number | null;
    name: string | null;
    dev: number | null;
    ino: number | null;
    mode: number | null;
    nlink: number | null;
    uid: number | null;
    gid: number | null;
    rdev: number | null;
    blksize: number | null;
    blocks: number | null;
    isFile(): boolean;
    isDirectory(): boolean;
    isSymlink(): boolean;
  }
  export function realpathSync(path: string): string;
  export function realpath(path: string): Promise<string>;
  export function readDirSync(path: string): FileInfo[];
  export function readDir(path: string): Promise<FileInfo[]>;
  export function copyFileSync(from: string, to: string): void;
  export function copyFile(from: string, to: string): Promise<void>;
  export function readlinkSync(name: string): string;
  export function readlink(name: string): Promise<string>;
  export function lstat(filename: string): Promise<FileInfo>;
  export function lstatSync(filename: string): FileInfo;
  export function stat(filename: string): Promise<FileInfo>;
  export function statSync(filename: string): FileInfo;
  export function linkSync(oldname: string, newname: string): void;
  export function link(oldname: string, newname: string): Promise<void>;
  export function symlinkSync(
    oldname: string,
    newname: string,
    type?: string,
  ): void;
  export function symlink(
    oldname: string,
    newname: string,
    type?: string,
  ): Promise<void>;
  export interface WriteFileOptions {
    perm?: number;
    create?: boolean;
    append?: boolean;
  }
  export function writeFileSync(
    filename: string,
    data: Uint8Array,
    options?: WriteFileOptions,
  ): void;
  export function writeFile(
    filename: string,
    data: Uint8Array,
    options?: WriteFileOptions,
  ): Promise<void>;
  interface Location {
    filename: string;
    line: number;
    column: number;
  }
  export function applySourceMap(location: Location): Location;
  export const errors: {
    NotFound: ErrorConstructor;
    PermissionDenied: ErrorConstructor;
    ConnectionRefused: ErrorConstructor;
    ConnectionReset: ErrorConstructor;
    ConnectionAborted: ErrorConstructor;
    NotConnected: ErrorConstructor;
    AddrInUse: ErrorConstructor;
    AddrNotAvailable: ErrorConstructor;
    BrokenPipe: ErrorConstructor;
    AlreadyExists: ErrorConstructor;
    InvalidData: ErrorConstructor;
    TimedOut: ErrorConstructor;
    Interrupted: ErrorConstructor;
    WriteZero: ErrorConstructor;
    Other: ErrorConstructor;
    UnexpectedEof: ErrorConstructor;
    BadResource: ErrorConstructor;
    Http: ErrorConstructor;
  };
  export type PermissionName =
    | "run"
    | "read"
    | "write"
    | "net"
    | "env"
    | "plugin"
    | "hrtime";
  export type PermissionState = "granted" | "denied" | "prompt";
  interface RunPermissionDescriptor {
    name: "run";
  }
  interface ReadWritePermissionDescriptor {
    name: "read" | "write";
    path?: string;
  }
  interface NetPermissionDescriptor {
    name: "net";
    url?: string;
  }
  interface EnvPermissionDescriptor {
    name: "env";
  }
  interface PluginPermissionDescriptor {
    name: "plugin";
  }
  interface HrtimePermissionDescriptor {
    name: "hrtime";
  }
  type PermissionDescriptor =
    | RunPermissionDescriptor
    | ReadWritePermissionDescriptor
    | NetPermissionDescriptor
    | EnvPermissionDescriptor
    | PluginPermissionDescriptor
    | HrtimePermissionDescriptor;
  export class Permissions {
    query(desc: PermissionDescriptor): Promise<PermissionStatus>;
    revoke(desc: PermissionDescriptor): Promise<PermissionStatus>;
    request(desc: PermissionDescriptor): Promise<PermissionStatus>;
  }
  export const permissions: Permissions;
  export class PermissionStatus {
    state: PermissionState;
    constructor(state: PermissionState);
  }
  export function truncateSync(name: string, len?: number): void;
  export function truncate(name: string, len?: number): Promise<void>;
  export interface AsyncHandler {
    (msg: Uint8Array): void;
  }
  export interface PluginOp {
    dispatch(
      control: Uint8Array,
      zeroCopy?: ArrayBufferView | null,
    ): Uint8Array | null;
    setAsyncHandler(handler: AsyncHandler): void;
  }
  export interface Plugin {
    ops: {
      [name: string]: PluginOp;
    };
  }
  export function openPlugin(filename: string): Plugin;
  export type Transport = "tcp" | "udp";
  export interface Addr {
    transport: Transport;
    hostname: string;
    port: number;
  }
  export interface UDPAddr {
    port: number;
    transport?: Transport;
    hostname?: string;
  }
  export enum ShutdownMode {
    Read = 0,
    Write,
    ReadWrite,
  }
  export function shutdown(rid: number, how: ShutdownMode): void;
  export function recvfrom(rid: number, p: Uint8Array): Promise<[number, Addr]>;
  export interface UDPConn extends AsyncIterator<[Uint8Array, Addr]> {
    receive(p?: Uint8Array): Promise<[Uint8Array, Addr]>;
    send(p: Uint8Array, addr: UDPAddr): Promise<void>;
    close(): void;
    readonly addr: Addr;
    [Symbol.asyncIterator](): AsyncIterator<[Uint8Array, Addr]>;
  }
  export interface Listener extends AsyncIterator<Conn> {
    accept(): Promise<Conn>;
    close(): void;
    readonly addr: Addr;
    [Symbol.asyncIterator](): AsyncIterator<Conn>;
  }
  export interface Conn extends Reader, Writer, Closer {
    readonly localAddr: Addr;
    readonly remoteAddr: Addr;
    readonly rid: number;
    closeRead(): void;
    closeWrite(): void;
  }
  export interface ListenOptions {
    port: number;
    hostname?: string;
    transport?: Transport;
  }
  export function listen(
    options: ListenOptions & { transport?: "tcp" },
  ): Listener;
  export function listen(
    options: ListenOptions & { transport: "udp" },
  ): UDPConn;
  export function listen(options: ListenOptions): Listener | UDPConn;
  export interface ListenTLSOptions extends ListenOptions {
    certFile: string;
    keyFile: string;
  }
  export function listenTLS(options: ListenTLSOptions): Listener;
  export interface ConnectOptions {
    port: number;
    hostname?: string;
    transport?: Transport;
  }
  export function connect(options: ConnectOptions): Promise<Conn>;
  export interface ConnectTLSOptions {
    port: number;
    hostname?: string;
    certFile?: string;
  }
  export function connectTLS(options: ConnectTLSOptions): Promise<Conn>;
  export interface Metrics {
    opsDispatched: number;
    opsCompleted: number;
    bytesSentControl: number;
    bytesSentData: number;
    bytesReceived: number;
  }
  export function metrics(): Metrics;
  interface ResourceMap {
    [rid: number]: string;
  }
  export function resources(): ResourceMap;
  export interface FsEvent {
    kind: "any" | "access" | "create" | "modify" | "remove";
    paths: string[];
  }
  export function fsEvents(
    paths: string | string[],
    options?: { recursive: boolean },
  ): AsyncIterableIterator<FsEvent>;
  type ProcessStdio = "inherit" | "piped" | "null";
  export function kill(pid: number, signo: number): void;
  export class Process {
    readonly rid: number;
    readonly pid: number;
    readonly stdin?: WriteCloser;
    readonly stdout?: ReadCloser;
    readonly stderr?: ReadCloser;
    status(): Promise<ProcessStatus>;
    output(): Promise<Uint8Array>;
    stderrOutput(): Promise<Uint8Array>;
    close(): void;
    kill(signo: number): void;
  }
  export interface ProcessStatus {
    success: boolean;
    code?: number;
    signal?: number;
  }
  export interface RunOptions {
    args: string[];
    cwd?: string;
    env?: {
      [key: string]: string;
    };
    stdout?: ProcessStdio | number;
    stderr?: ProcessStdio | number;
    stdin?: ProcessStdio | number;
  }
  export function run(opt: RunOptions): Process;
  enum LinuxSignal {
    SIGHUP = 1,
    SIGINT = 2,
    SIGQUIT = 3,
    SIGILL = 4,
    SIGTRAP = 5,
    SIGABRT = 6,
    SIGBUS = 7,
    SIGFPE = 8,
    SIGKILL = 9,
    SIGUSR1 = 10,
    SIGSEGV = 11,
    SIGUSR2 = 12,
    SIGPIPE = 13,
    SIGALRM = 14,
    SIGTERM = 15,
    SIGSTKFLT = 16,
    SIGCHLD = 17,
    SIGCONT = 18,
    SIGSTOP = 19,
    SIGTSTP = 20,
    SIGTTIN = 21,
    SIGTTOU = 22,
    SIGURG = 23,
    SIGXCPU = 24,
    SIGXFSZ = 25,
    SIGVTALRM = 26,
    SIGPROF = 27,
    SIGWINCH = 28,
    SIGIO = 29,
    SIGPWR = 30,
    SIGSYS = 31,
  }
  enum MacOSSignal {
    SIGHUP = 1,
    SIGINT = 2,
    SIGQUIT = 3,
    SIGILL = 4,
    SIGTRAP = 5,
    SIGABRT = 6,
    SIGEMT = 7,
    SIGFPE = 8,
    SIGKILL = 9,
    SIGBUS = 10,
    SIGSEGV = 11,
    SIGSYS = 12,
    SIGPIPE = 13,
    SIGALRM = 14,
    SIGTERM = 15,
    SIGURG = 16,
    SIGSTOP = 17,
    SIGTSTP = 18,
    SIGCONT = 19,
    SIGCHLD = 20,
    SIGTTIN = 21,
    SIGTTOU = 22,
    SIGIO = 23,
    SIGXCPU = 24,
    SIGXFSZ = 25,
    SIGVTALRM = 26,
    SIGPROF = 27,
    SIGWINCH = 28,
    SIGINFO = 29,
    SIGUSR1 = 30,
    SIGUSR2 = 31,
  }
  export const Signal: typeof MacOSSignal | typeof LinuxSignal;
  interface ConsoleOptions {
    showHidden?: boolean;
    depth?: number;
    colors?: boolean;
    indentLevel?: number;
  }
  export function inspect(value: unknown, options?: ConsoleOptions): string;
  export type OperatingSystem = "mac" | "win" | "linux";
  export type Arch = "x64" | "arm64";
  interface BuildInfo {
    arch: Arch;
    os: OperatingSystem;
  }
  export const build: BuildInfo;
  interface Version {
    deno: string;
    v8: string;
    typescript: string;
  }
  export const version: Version;
  export enum DiagnosticCategory {
    Log = 0,
    Debug = 1,
    Info = 2,
    Error = 3,
    Warning = 4,
    Suggestion = 5,
  }
  export interface DiagnosticMessageChain {
    message: string;
    category: DiagnosticCategory;
    code: number;
    next?: DiagnosticMessageChain[];
  }
  export interface DiagnosticItem {
    message: string;
    messageChain?: DiagnosticMessageChain;
    relatedInformation?: DiagnosticItem[];
    sourceLine?: string;
    lineNumber?: number;
    scriptResourceName?: string;
    startPosition?: number;
    endPosition?: number;
    category: DiagnosticCategory;
    code: number;
    startColumn?: number;
    endColumn?: number;
  }
  export interface Diagnostic {
    items: DiagnosticItem[];
  }
  export function formatDiagnostics(items: DiagnosticItem[]): string;
  export interface CompilerOptions {
    allowJs?: boolean;
    allowSyntheticDefaultImports?: boolean;
    allowUmdGlobalAccess?: boolean;
    allowUnreachableCode?: boolean;
    allowUnusedLabels?: boolean;
    alwaysStrict?: boolean;
    baseUrl?: string;
    checkJs?: boolean;
    declaration?: boolean;
    declarationDir?: string;
    declarationMap?: boolean;
    downlevelIteration?: boolean;
    emitBOM?: boolean;
    emitDeclarationOnly?: boolean;
    emitDecoratorMetadata?: boolean;
    esModuleInterop?: boolean;
    experimentalDecorators?: boolean;
    inlineSourceMap?: boolean;
    inlineSources?: boolean;
    isolatedModules?: boolean;
    jsx?: "react" | "preserve" | "react-native";
    jsxFactory?: string;
    keyofStringsOnly?: string;
    useDefineForClassFields?: boolean;
    lib?: string[];
    locale?: string;
    mapRoot?: string;
    module?:
      | "none"
      | "commonjs"
      | "amd"
      | "system"
      | "umd"
      | "es6"
      | "es2015"
      | "esnext";
    noEmitHelpers?: boolean;
    noFallthroughCasesInSwitch?: boolean;
    noImplicitAny?: boolean;
    noImplicitReturns?: boolean;
    noImplicitThis?: boolean;
    noImplicitUseStrict?: boolean;
    noResolve?: boolean;
    noStrictGenericChecks?: boolean;
    noUnusedLocals?: boolean;
    noUnusedParameters?: boolean;
    outDir?: string;
    paths?: Record<string, string[]>;
    preserveConstEnums?: boolean;
    removeComments?: boolean;
    resolveJsonModule?: boolean;
    rootDir?: string;
    rootDirs?: string[];
    sourceMap?: boolean;
    sourceRoot?: string;
    strict?: boolean;
    strictBindCallApply?: boolean;
    strictFunctionTypes?: boolean;
    strictPropertyInitialization?: boolean;
    strictNullChecks?: boolean;
    suppressExcessPropertyErrors?: boolean;
    suppressImplicitAnyIndexErrors?: boolean;
    target?:
      | "es3"
      | "es5"
      | "es6"
      | "es2015"
      | "es2016"
      | "es2017"
      | "es2018"
      | "es2019"
      | "es2020"
      | "esnext";
    types?: string[];
  }
  export interface TranspileOnlyResult {
    source: string;
    map?: string;
  }
  export function transpileOnly(
    sources: Record<string, string>,
    options?: CompilerOptions,
  ): Promise<Record<string, TranspileOnlyResult>>;
  export function compile(
    rootName: string,
    sources?: Record<string, string>,
    options?: CompilerOptions,
  ): Promise<[DiagnosticItem[] | undefined, Record<string, string>]>;
  export function bundle(
    rootName: string,
    sources?: Record<string, string>,
    options?: CompilerOptions,
  ): Promise<[DiagnosticItem[] | undefined, string]>;
  export const args: string[];
  export class SignalStream
    implements AsyncIterableIterator<void>, PromiseLike<void> {
    constructor(signal: typeof Deno.Signal);
    then<T, S>(
      f: (v: void) => T | Promise<T>,
      g?: (v: void) => S | Promise<S>,
    ): Promise<T | S>;
    next(): Promise<IteratorResult<void>>;
    [Symbol.asyncIterator](): AsyncIterableIterator<void>;
    dispose(): void;
  }
  export function signal(signo: number): SignalStream;
  export const signals: {
    alarm: () => SignalStream;
    child: () => SignalStream;
    hungup: () => SignalStream;
    interrupt: () => SignalStream;
    io: () => SignalStream;
    pipe: () => SignalStream;
    quit: () => SignalStream;
    terminate: () => SignalStream;
    userDefined1: () => SignalStream;
    userDefined2: () => SignalStream;
    windowChange: () => SignalStream;
  };
  export const symbols: {
    readonly internal: unique symbol;
    readonly customInspect: unique symbol;
  };
}