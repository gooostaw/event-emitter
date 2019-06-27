interface ListenerFunc {
    (...args: any): any;
}
declare class EventListener {
    eventEmitter: EventEmitter;
    eventName: string;
    func: ListenerFunc;
    isOn: boolean;
    constructor(eventEmitter: EventEmitter, eventName: string, listenerFunc: ListenerFunc);
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
    off(eventName: string, listenerFn: ListenerFunc): void;
    emit(eventName: string, ...args: any[]): void;
    clear(): void;
}
export {};
