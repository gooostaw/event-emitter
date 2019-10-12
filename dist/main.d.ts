export interface ListenerFunc {
    (...args: any): any;
}
export declare class EventListener {
    eventEmitter: EventEmitter;
    eventName: string;
    func: ListenerFunc;
    isOn: boolean;
    emitOnce: boolean;
    constructor(eventEmitter: EventEmitter, eventName: string, listenerFunc: ListenerFunc, emitOnce?: boolean);
    emit(...args: any[]): void;
    on(): void;
    off(): void;
    remove(): void;
}
export default class EventEmitter {
    events: Map<string, Set<EventListener>>;
    constructor();
    getListenersSet(name: string): Set<EventListener>;
    on(eventName: string, listenerFn: ListenerFunc): EventListener;
    one(eventName: string, listenerFn: ListenerFunc): EventListener;
    off(eventName: string, listenerFn: ListenerFunc): void;
    emit(eventName: string, ...args: any[]): void;
    clear(): void;
}
