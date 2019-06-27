interface ListenerFunc {
    (...args: any): any;
}

class EventListener {
    eventEmitter: EventEmitter;
    eventName: string;
    func: ListenerFunc;
    isOn: boolean;

    constructor(eventEmitter: EventEmitter, eventName: string, listenerFunc: ListenerFunc) {
        this.eventEmitter = eventEmitter;
        this.eventName = eventName;
        this.func = listenerFunc;
        this.isOn = true;

        let listeners = eventEmitter.getListenersSet(eventName);
        if (listeners)
            listeners.add(this);
    }

    emit(...args: any[]) {
        if (this.isOn)
            this.func(...args);
    }

    on() {
        this.isOn = true;
    }

    off() {
        this.isOn = false;
    }

    remove() {
        let listeners = this.eventEmitter.getListenersSet(this.eventName);
        if (listeners)
            listeners.delete(this);
    }
}

export default class EventEmitter {
    events: Map<string, Set<EventListener>>;

    constructor() {
        this.events = new Map();
    };

    getListenersSet(name: string): Set<EventListener> {
        let listenerSet = this.events.get(name)
        if (listenerSet)
            return listenerSet;

        listenerSet = new Set;
        this.events.set(name, listenerSet);
        return listenerSet;
    }

    on(eventName: string, listenerFn: ListenerFunc) {
        return new EventListener(this, eventName, listenerFn);
    }

    off(eventName: string, listenerFn: ListenerFunc) {
        if (listenerFn) {
            for (let listener of this.getListenersSet(eventName))
                if (listenerFn === listener.func)
                    listener.remove();
        }
        else {
            for (let listener of this.getListenersSet(eventName))
                listener.remove();
        }
    }

    emit(eventName: string, ...args: any[]) {
        for (let listener of this.getListenersSet(eventName))
            listener.emit(...args);
    }

    clear() {
        for (let [name, listenersSet] of this.events)
            for (let listener of listenersSet)
                listener.remove();
    }
}